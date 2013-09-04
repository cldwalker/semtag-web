(ns semtag-web.rendering
  (:require [domina :as dom]
            [domina.css :as css]
            [semtag-web.rendering-util :as util]
            [semtag-web.partials :as p]
            [clojure.string]
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
       (clojure.string/join ", ")))

(defn- frequency-stat [title data]
  (format "%s: %s - %s" title (count data) (frequencies-string data)))

;; Rendering fns

(def templates (html-templates/semtag-web-templates))

(defn render-home-page [renderer [_ path] transmitter]
  (let [html (templates/add-template renderer path (:semtag-web-page templates))]
    ;; didn't use get-parent-id cause it doesn't work for new multi-level paths
    (dom/set-html! (dom/by-id "content") (html {}))))

(defn render-page [renderer [_ _ _ value :as delta] input-queue]
  (case value
    "noop" (.log js/console "NOOP") ; test route
    "home" (render-home-page renderer delta input-queue)
    nil))

(defn render-message [renderer [_ path _ new-value] transmitter]
  (dom/set-html! (dom/by-id "search_title") new-value))

(defn render-search-results [_ [_ _ _ new-value] _]
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
                        :caption (format "Total: %s" (count (map :url things)))))))

(defn render-types-results [_ [_ _ _ new-value] _]
  (dom/set-html!
    (dom/by-id "content")
    (p/generate-table "type_stats_table" (:results new-value)
                      :caption (format "%s things, %s tags"
                                       (get-in new-value [:counts :thing])
                                       (get-in new-value [:counts :tags]))
                      :row-partial p/type-stats-row
                      :fields [:name :count :name-percent :url-percent])))

(defn render-tags-results [_ [_ _ _ new-value] _]
  (dom/insert-after!
    (dom/by-id "url_search_text")
    (p/generate-datalist new-value)))

(defn render-tag-stats-results [_ [_ _ _ new-value] _]
  (dom/set-html!
    (dom/by-id "content")
    (p/generate-table "tag_stats_table" new-value
                      :row-partial p/tag-stats-row
                      :caption (str "Total: " (count new-value))
                      :fields [:tag :count :desc])))

(defn url-search [{:keys [transform messages]}]
  (msg/fill transform messages {:query (.-value (dom/by-id "url_search_text"))
                                :search-type (dom/value (css/sel "input[name=search_type]:checked"))}))

(defn create-url [{:keys [transform messages]}]
  (msg/fill transform messages {:value (dom/value (dom/by-id "add_url_text"))}))

(defn render-config []
  (reduce
    into
    [[;[:value [:app-model :page] render-page]
      [:node-create [:app-model :home] render-home-page]
      [:value [:app-model :home :search-title] render-message]
      [:value [:app-model :home :tags-results] render-tags-results]
      [:value [:app-model :search-results] render-search-results]
      [:value [:app-model :types-results] render-types-results]
      [:value [:app-model :tag-stats-results] render-tag-stats-results]]
     (util/click [:app-model :search] "url_search_button" :fn url-search)
     (util/click [:app-model :create-url] "add_url_button" :fn create-url)]))
