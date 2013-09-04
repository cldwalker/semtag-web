;; from https://gist.github.com/brentonashworth/5728698
(ns semtag-web.history
  (:require [io.pedestal.app.protocols :as p]
            [io.pedestal.app.util.log :as log]
            [io.pedestal.app.messages :as msg]))

(def last-page (atom nil))

(def dispatchers (atom {}))

(defn navigate [token]
  (when-let [d (get @dispatchers token)]
    (.log js/console "NAVIGATE" (pr-str token))
    (p/put-message d {msg/topic msg/app-model
                      msg/type :set-focus
                      :name token})))

(def supported? (and js/history (.-pushState js/history)))

(defn navigated [d token]
  (when supported?
    (.log js/console "NAVIGATED" (pr-str token))
    (let [current-token (.-state js/history)]
      (when (not= current-token token)
        (if (nil? @last-page)
          (.replaceState js/history token nil nil)
          (.pushState js/history token nil nil))))
    (reset! last-page token)
    (swap! dispatchers assoc token d)))

(if supported?
  (set! (.-onpopstate js/window) (fn [e]
                                   (.log js/console "POP" (pr-str (.-state e)))
                                   (navigate (.-state e))))
  (log/warn :in :semtag-web.history
            :message "HTML 5 History is not supported in this browser!"))