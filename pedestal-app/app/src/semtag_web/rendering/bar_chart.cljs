(ns semtag-web.rendering.bar-chart
  "D3 bar chart based on http://mbostock.github.io/d3/tutorial/bar-1.html
  and https://github.com/dribnet/strokes/tree/master/examples/simple-bar"
  (:require [domina :as dom]))

(def d3 (this-as ct (aget ct "d3")))

;; mouse* fns for tooltips - based on http://bl.ocks.org/biovisualize/1016860
(defn mouseover [e]
  (when-let [title (-> d3.event .-target .-parentNode .-attributes (.getNamedItem "title"))]
    (dom/set-html! (dom/by-id "tooltip") (.-value title)))
  (-> (dom/by-id "tooltip") .-style .-visibility (set! "visible")))

(defn mousemove []
  (-> (dom/by-id "tooltip") .-style .-top (set! (str (- d3.event.pageY 10) "px")))
  (-> (dom/by-id "tooltip") .-style .-left (set! (str (+ d3.event.pageX 10) "px"))))

(defn mouseout []
  (-> (dom/by-id "tooltip") .-style .-visibility (set! "hidden")))

(defn setup-bar [bar x y]
  ;; add rect
  (-> bar (.append "rect")
      (.attr (clj->js {:width x
                       :height (.rangeBand y)})))

  ;; add text
  (-> bar (.append "text")
      (.attr (clj->js {:x x
                       :y (/ (.rangeBand y) 2)
                       :dx -6
                       :dy ".35em"
                       :text-anchor "end"}))
      (.style "fill" "white")
      (.text identity))

  (-> bar
      (.on "mouseover" mouseover)
      (.on "mousemove" mousemove)
      (.on "mouseout" mouseout)))

(defn render* [id data labels]
  (let [height (* 20 (count data))
        width 440
        x (-> d3 .-scale (.linear)
              (.domain (array 0 (apply max data)))
              (.range (array 0 width)))
        y (-> d3 .-scale (.ordinal)
              (.domain (apply array (range (count data))))
              (.rangeRoundBands (array 0 height) 0.2))
        svg (-> d3 (.select id) (.append "svg")
                (.attr (clj->js {:width width :height height}))
                (.append "g"))
        bar (-> svg (.selectAll "g.bar")
                (.data (clj->js data))
                (.enter) (.append "g")
                (.attr (clj->js {:class "bar"
                                 :title #(get labels %2)
                                 :transform #(str "translate(0," (y %2) ")")})))]
    (setup-bar bar x y)))

(defn render [id data]
  (if (empty? data)
    (dom/append! (dom/by-id (subs id 1)) "<p>There are no statistics for this empty data set.</p>")
    (render* id (mapv first data) (mapv second data))))
