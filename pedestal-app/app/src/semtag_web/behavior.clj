(ns ^:shared semtag-web.behavior
    (:require [io.pedestal.app :as app]
              [io.pedestal.app.messages :as msg]))

(defn set-value [old-value message]
  (:value message))

(defn map-value [_ message]
  (dissoc message msg/topic msg/type))

(defn home-deltas []
  [[:transform-enable [:app-model :home :create-url] :create-url [{msg/type :set-value msg/topic [:create-url] (msg/param :value) {}}]]
   [:transform-enable [:app-model :home :search] :search [{msg/type :map-value msg/topic [:search] (msg/param :query) {} (msg/param :search-type) {}}]]])

(defn navbar-deltas []
  [[:transform-enable [:app-model :navbar :types] :types-link [{msg/type :set-value msg/topic [:page] (msg/param :value) {}}
                                                               {msg/type :set-focus msg/topic msg/app-model :name :types}]]])

;; pass full message so we can differentiate between effects in services.cljs
(defn publish-message [{:keys [message]}]
  ;; needs to return a collection
  [message])

(defn init-home [_]
  (into [[:node-create [:app-model :home]]]
        (home-deltas)))

(defn page-deltas [{{page :page} :new-model}]
  (into [[:value [:app-model :page] page]]
        ;; transform deltas have to come after page is visible - otherwise
        ;; you're binding to nonexistant dom ids
        (if (= "home" page)
          (home-deltas) [])))

(defn init-types [_]
  [[:node-create [:app-model :types]]])

(def example-app
  {:version 2
   :transform [[:set-value [:page] set-value]
               [:set-value [:search-title] set-value]
               [:map-value [:search] map-value]
               [:set-value [:create-url] set-value]
               [:set-value [:types-results] set-value]
               [:set-value [:tags-results] set-value]
               [:set-value [:tag-stats-results] set-value]
               [:set-value [:search-results] set-value]]
   :effect #{[#{[:page] [:search] [:create-url]} publish-message]}
   :emit [#_[#{[:page]} page-deltas]
          {:init init-home}
          [#{[:search] [:search-title] [:tags-results] [:search-results]} (app/default-emitter [:app-model :home])]

          {:init init-types}
          [#{[:types-results]} (app/default-emitter [:app-model :types])]

          {:init navbar-deltas}
          #_[#{[:*]} (app/default-emitter [:app-model])]]
   :focus {:home [[:app-model :home] [:app-model :navbar]]
           :types [[:app-model :types] [:app-model :navbar]]
           :default :home}})

