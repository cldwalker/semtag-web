(ns ^:shared semtag-web.behavior
    (:require [io.pedestal.app :as app]
              [io.pedestal.app.messages :as msg]))

;; Transform fns
;;
(defn set-value [old-value message]
  (:value message))

(defn map-value [_ message]
  (dissoc message msg/topic msg/type))

;; Effect fns
;;
;; pass full message so we can differentiate between effects in services.cljs
(defn publish-message [{:keys [message]}]
  ;; needs to return a collection
  [message])

;; Emit fns
;;
(defn home-deltas []
  [[:transform-enable [:app-model :home :create-url] :create-url [{msg/type :set-value msg/topic [:create-url] (msg/param :value) {}}]]
   [:transform-enable [:app-model :home :search] :search [#_{msg/type :set-focus msg/topic msg/app-model :name :search}
                                                          {msg/type :map-value msg/topic [:search] (msg/param :query) {} (msg/param :search-type) {}}]]])


(defn navbar-deltas []
  [[:transform-enable [:app-model :navbar :links] :links [{msg/type :set-value msg/topic [:page] (msg/param :value) {}}
                                                          {msg/type :set-focus msg/topic msg/app-model (msg/param :name) {}}]]])

(defn init-home [_]
  (into [[:node-create [:app-model :home]]]
        (home-deltas)))

(defn init-types [_]
  [[:node-create [:app-model :types]]])

(defn init-tag-stats [_]
  [[:node-create [:app-model :tag-stats]]])

(defn init-all [_]
  [[:node-create [:app-model :all]]])

(defn init-search [_]
  [[:node-create [:app-model :search]]])

(defn sub-search [{:keys [new-model]}]
  #_(.log js/console "PATH-emit" (pr-str (hash (sorted-map (:search new-model))) (:search new-model)))
  (when (:search new-model)
    [[:node-create [:app-model :search (keyword (str "search-" (hash (sorted-map (:search new-model)))))]]]))

(defn navigate-input [msg]
  (.log js/console "PRE" (pr-str msg))
  (if (= (:name msg) :search)
    [msg (merge {msg/type :map-value msg/topic [:search]} (select-keys msg [:query :search-type]))]
    [msg]))

(def example-app
  {:version 2
   ;; [:page] msg path used to trigger on screen load effects since :set-focus can't do it
   :transform [[:set-value [:page] set-value]
               [:set-value [:* :search-title] set-value]
               [:map-value [:search] map-value]
               [:set-value [:create-url] set-value]
               [:set-value [:types-results] set-value]
               [:set-value [:tags-results] set-value]
               [:set-value [:tag-stats-results] set-value]
               [:set-value [:all-results] set-value]
               [:set-value [:alert-error] set-value]
               [:set-value [:* :search-results] set-value]]
   :effect #{[#{[:page] [:search] [:create-url]} publish-message]}
   :emit [{:init init-home}
          [#{[:tags-results]} (app/default-emitter [:app-model :home])]

          {:init init-types}
          [#{[:types-results]} (app/default-emitter [:app-model :types])]

          {:init init-tag-stats}
          [#{[:tag-stats-results]} (app/default-emitter [:app-model :tag-stats])]

          {:init init-all}
          [#{[:all-results]} (app/default-emitter [:app-model :all])]

          ;{:init init-search}
          [#{[:search]} sub-search]
          [#{[:* :search-title] [:* :search-results]} (app/default-emitter [:app-model :search])]

          {:init navbar-deltas}
          [#{[:alert-error]} (app/default-emitter [:app-model :navbar])]
          #_[#{[:*]} (app/default-emitter [:app-model])]]
   :focus {:home [[:app-model :home] [:app-model :navbar]]
           :types [[:app-model :types] [:app-model :navbar]]
           :tag-stats [[:app-model :tag-stats] [:app-model :navbar]]
           :all [[:app-model :all] [:app-model :navbar]]
           :search [[:app-model :search] [:app-model :home] [:app-model :navbar]]
           :default :home}})

