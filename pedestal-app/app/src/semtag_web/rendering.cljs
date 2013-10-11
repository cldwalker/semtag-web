(ns semtag-web.rendering
  (:require [domina :as dom]
            [domina.css :as css]
            [semtag-web.rendering-util :as util]
            [semtag-web.partials :as p]
            [semtag-web.history :as history]
            [semtag-web.route :as route]
            [clojure.string :as string]
            [io.pedestal.app.protocols :as prot]
            [io.pedestal.app.render.events :as events]
            [io.pedestal.app.render.push :as render]
            [io.pedestal.app.messages :as msg]
            [io.pedestal.app.render.push.templates :as templates]
            [io.pedestal.app.render.push.handlers.automatic :as d])
  (:require-macros [semtag-web.html-templates :as html-templates]))

;; Helper fns

(defn- frequencies-string [items]
  (->> items
       frequencies
       (sort-by #(second %1) (fn [a b] (> a b)))
       (map #(format "%s %s" (second %1) (name (first %1))))
       (string/join ", ")))

(defn- frequency-stat [title data]
  (format "%s: %s - %s" title (count data) (frequencies-string data)))

(defn clear-id [id]
  (fn [_ _ _] (dom/set-html! (dom/by-id id) "")))

(defn navigate-fn [screen]
  (fn [_ _ input-queue]
    (history/navigated input-queue screen)))

(defn render-alert
  "Adds an alert box at the top of the page"
  [msg alert-type]
  (dom/prepend! (dom/by-id "main")
                (p/alert msg (str "alert-" (name alert-type)))))

;; Rendering fns

(def templates (html-templates/semtag-web-templates))

;;; Search-form
;;;
(defn render-search-form [renderer [_ path] input-queue]
  (let [html (templates/add-template renderer path (:semtag-web-page templates))]
    ;; didn't use get-parent-id cause it doesn't work for new multi-level paths
    (dom/set-html! (dom/by-id "content") (html {}))))

(defn render-tags-results [_ [_ _ _ new-value] _]
  (dom/insert-after!
    (dom/by-id "url_search_text")
    (p/generate-datalist new-value)))

(defn url-search [{:keys [transform messages]}]
  (let [search-map {:query (.-value (dom/by-id "url_search_text"))
                    :search-type (dom/value (css/sel "input[name=search_type]:checked"))}
        search-id (route/create-screen-id :search search-map)]
    ;; needed for history navigation
    (swap! route/dynamic-screens assoc search-id search-map)
    (msg/fill transform messages (assoc search-map
                                        :name search-id
                                        :paths [[:app-model :search-form] [:app-model :search search-id] [:app-model :navbar]]))))

(defn create-url [{:keys [transform messages]}]
  (msg/fill transform messages {:value (dom/value (dom/by-id "add_url_text"))}))

;; Search page
(defn set-search-title [renderer [_ path _ new-value] _]
  (dom/set-html! (dom/by-id "search_title") new-value))

(defn render-search-results [_ [_ _ _ new-value] input-queue]
  (let [{:keys [things tags]} new-value]
    (dom/swap-content!
      (dom/by-id "table_stats")
      (p/table-stats (frequency-stat "Tag Type Counts" (map first tags))
                     (frequency-stat "Tag Counts" (flatten (map :tags things)))
                     (frequency-stat "Type Counts" (map :type things))))
    (dom/swap-content!
      (dom/by-id "search_table")
      (p/generate-table "search_table" things
                        :fields [:type :name :url :desc :tags]
                        :row-partial p/tag-search-row
                        :caption (format "Total: %s" (count (map :url things)))))
    (enable-clickable-links-on "#search_table td:not([data-field=url])" input-queue)))

;; we'd like to destroy/hide these but that requires changing render-search-results
(defn clear-search [_ _ _]
  (dom/set-html! (dom/by-id "table_stats") "")
  (dom/set-html! (dom/by-id "search_table") ""))

;;; Other pages
;;;
(defn render-types-results [_ [_ _ _ new-value] _]
  (dom/set-html!
    (dom/by-id "content")
    (p/generate-table "type_stats_table" (:results new-value)
                      :caption (format "%s things, %s tags"
                                       (get-in new-value [:counts :thing])
                                       (get-in new-value [:counts :tags]))
                      :row-partial p/type-stats-row
                      :fields [:name :count :name-percent :url-percent])))

;; TODO: reuse with one in start or delete
(defn- parse-params [url]
  (when-let [params-string (re-find #"(?!.*\?).*" url)]
    (-> params-string
        (string/split #"\&")
        (as-> pairs
          (map #(let [[k v] (string/split % #"=")] [(keyword k) v]) pairs))
        flatten
        vec
        (as-> vals (apply hash-map vals)))))

(defn href-sets-dynamic-focus [{:keys [transform messages event]}]
  (if-let [screen (route/url->screen (->> event .-currentTarget .-href (re-find #"#.*?$")))]
    (msg/fill transform messages {:value (name screen) :name screen})
    (.log js/console "No screen found for element" (.-currentTarget event))))

;; TODO - only generate :add-named-paths for dynamic focii
(defn dynamic-focus-messages [& {:keys [params screen paths]}]
  [{msg/type :add-named-paths msg/topic msg/app-model :name screen :paths paths}
   {msg/type :set-focus msg/topic msg/app-model :name screen}
   {msg/type :map-value msg/topic [:page] :value (name screen) :params params}])

;; Yes, we should be sending messages to do this separately but
;; that seems like overkill right now
;; TODO - make this generic
(defn enable-clickable-links-on
  [parent-selector input-queue]
  (events/send-on :click
                  (css/sel (str parent-selector " a"))
                  input-queue
                  (fn [event]
                    (let [rel-uri (->> event .-evt .-currentTarget .-href (re-find #"#.*?$"))
                          params (parse-params rel-uri)
                          screen (route/url->screen rel-uri params)]
                      (swap! route/dynamic-screens assoc screen params)
                      (dynamic-focus-messages
                        :screen screen
                        :params params
                        :paths [[:app-model :thing screen] [:app-model :navbar]])))))

(defn render-tag-stats-results [_ [_ _ _ new-value] input-queue]
  (dom/set-html!
    (dom/by-id "content")
    (p/generate-table "tag_stats_table" new-value
                      :row-partial p/tag-stats-row
                      :caption (str "Total: " (count new-value))
                      :fields [:tag :count :desc]))

  (enable-clickable-links-on "#tag_stats_table" input-queue))

(defn render-all-results [_ [_ _ _ new-value] input-queue]
  (dom/set-html!
    (dom/by-id "content")
    (p/generate-table "all_table" new-value
                      :row-partial p/all-row
                      :caption (str "Total: " (count new-value))
                      :fields [:type :name :url :tags :created-at]))
  (enable-clickable-links-on "#all_table td:not([data-field=url])" input-queue))

(defn render-thing-results [_ [_ path _ new-value] input-queue]
  (let [thing-id (nth path (- (count path) 2))]
    (dom/set-html!
      (dom/by-id "content")
      (p/generate-table "thing_show_table"
                        (conj new-value {:attribute :actions :id (:id (first new-value))})
                        ;; TODO - fix id when it renders
                        :caption (if (re-find #"\d+$" thing-id) "" (p/link-tagged thing-id))
                        :row-partial p/thing-row
                        :fields [:attribute :value])))
  (enable-clickable-links-on "#thing_show_table" input-queue))

(defn href-sets-focus [{:keys [transform messages event]}]
  (if-let [screen (route/url->screen (->> event .-currentTarget .-href (re-find #"#.*?$")))]
    (msg/fill transform messages {:value (name screen) :name screen})
    (.log js/console "No screen found for element" (.-currentTarget event))))

(defn render-alert-error [_ [_ _ _ msg] _]
  (render-alert msg :error))

(defn navigate-path
  "Navigate paths whose last element is the navigated id"
  [_ [_ path] input-queue]
  (history/navigated input-queue (last path)))

;; TODO - undo for all :value's that render
(defn render-config []
  (reduce
    into
    [[[:node-create [:app-model :home] (navigate-fn :home)]
      ;; nothing to destroy yet

      ;; search-form section
      [:node-create [:app-model :search-form] render-search-form]
      [:node-destroy [:app-model :search-form] (clear-id "content")]
      [:value [:app-model :search-form :tags-results] render-tags-results]

      ;; types page
      [:node-create [:app-model :types] (navigate-fn :types)]
      [:node-destroy [:app-model :types] (clear-id "content")]
      [:value [:app-model :types :types-results] render-types-results]

      ;; tag-stats page
      [:node-create [:app-model :tag-stats] (navigate-fn :tag-stats)]
      [:node-destroy [:app-model :tag-stats] (clear-id "content")]
      [:value [:app-model :tag-stats :tag-stats-results] render-tag-stats-results]

     ;; all page
     [:node-create [:app-model :all] (navigate-fn :all)]
     [:node-destroy [:app-model :all] (clear-id "content")]
     [:value [:app-model :all :all-results] render-all-results]

     ;; search page
     [:node-create [:app-model :search :*] navigate-path]
     [:node-destroy [:app-model :search :*] clear-search]
     [:value [:app-model :search :* :search-title] set-search-title]
     [:value [:app-model :search :* :search-results] render-search-results]

    ;; thing page
     [:node-create [:app-model :thing :*] navigate-path]
     [:node-destroy [:app-model :thing :*] (clear-id "content")]
     [:value [:app-model :thing :* :thing-results] render-thing-results]

    ;; navbar/shared
    [:value [:app-model :navbar :alert-error] render-alert-error]
     ]

     ;; navbar
     (util/click [:app-model :navbar :links] (css/sel ".navbar a") :fn href-sets-focus)

     ;; search-form
     (util/click [:app-model :search-form :search] "url_search_button" :fn url-search)
     (util/click [:app-model :search-form :create-url] "add_url_button" :fn create-url)]))
