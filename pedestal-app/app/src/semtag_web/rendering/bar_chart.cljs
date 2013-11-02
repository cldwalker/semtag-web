(ns semtag-web.rendering.bar-chart
  "Copied from https://github.com/dribnet/strokes/tree/master/examples/simple-bar"
  (:require [strokes :refer [d3]]))

; rect: data ↦ width, index ↦ y
; adapted from mike bostocks slide presentation

;;;; shared data across the 3 examples

(def data [63 39 31 53 25 32 175 69 51])

(def m [50 40 50 40])
(def w (- 960 (m 1) (m 3)))
(def h (- 500  (m 0) (m 2)))

;;;; a world without strokes (to compare code)

; x is a fn: data ↦ width
(defn strokeless []
  (def x1 (-> d3 .-scale (.linear)
  (.domain (array 0 (apply max data)))
  (.range (array 0 w))))

; y is a fn: index ↦ y
(def y1 (-> d3 .-scale (.ordinal)
  (.domain (apply array (range (count data))))
  (.rangeRoundBands (array 0 h) 0.2)))

(def svg1 (-> d3 (.select "#static") (.append "svg")
    (.attr (clj->js {:width  (+ w (m 1) (m 3))
            :height (+ h (m 0) (m 2))}))
  (.append "g")
    (.attr (clj->js {:transform (str "translate(" (m 3) "," (m 0) ")")}))))

; Data ↦ Element
(def bar1 (-> svg1 (.selectAll "g.bar")
    (.data (clj->js data))
  (.enter) (.append "g")
    (.attr (clj->js {:class "bar"
            :transform #(str "translate(0," (y1 %2) ")")}))))

; Data Attributes ↦ Element Attributes
(-> bar1 (.append "rect")
    (.attr (clj->js {:width   #(x1 %)
            :height  (.rangeBand y1)}))
    (.style (clj->js {:fill   "indianred"
             :stroke-opacity 0})))

; Data Attributes ↦ Element Attributes
(-> bar1 (.append "text")
    (.attr (clj->js {:x  x1
            :y  (/ (.rangeBand y1) 2)
            :dx -6
            :dy ".35em"
            :text-anchor "end"}))
    (.style "fill" "white")
    (.text identity)))

(defn render []
;;;;;; a world with strokes!
(strokes/bootstrap) 

; x is a fn: data ↦ width
(def x (-> d3 .-scale (.linear)
  (.domain [0 (apply max data)])
  (.range [0 w]))) 

; y is a fn: index ↦ y
(def y (-> d3 .-scale (.ordinal)
  (.domain (vec (range (count data))))
  (.rangeRoundBands [0 h] 0.2))) 

(def svg2 (-> d3 (.select "#static") (.append "svg")
    (.attr {:width  (+ w (m 1) (m 3))
            :height (+ h (m 0) (m 2))})
  (.append "g")
    (.attr {:transform (str "translate(" (m 3) "," (m 0) ")")}))) 

; Data ↦ Element
(def bar2 (-> svg2 (.selectAll "g.bar")
    (.data data)
  (.enter) (.append "g")
    (.attr {:class "bar"
            :transform #(str "translate(0," (y %2) ")")}))) 

; Data Attributes ↦ Element Attributes
(-> bar2 (.append "rect")
    (.attr {:width   #(x %)
            :height  (.rangeBand y)})
    (.style {:fill   "indianred"
             :stroke-opacity 0})) 

; Data Attributes ↦ Element Attributes
(-> bar2 (.append "text")
    (.attr {:x  x
            :y  (/ (.rangeBand y) 2)
            :dx -6
            :dy ".35em"
            :text-anchor "end"})
    (.style "fill" "white")
    (.text identity))) 

;; ;;;;;;;; now an animated version
;; 
;; (def svg (-> d3 (.select "#animated") (.append "svg")
;;     (.attr {:width  (+ w (m 1) (m 3))
;;             :height (+ h (m 0) (m 2))})
;;   (.append "g")
;;     (.attr {:transform (str "translate(" (m 3) "," (m 0) ")")})))
;; 
;; (def bar (-> svg (.selectAll "g.bar")
;;     (.data data)
;;   (.enter) (.append "g")
;;     (.attr {:class "bar"
;;             :transform #(str "translate(" (* %2 60) ")")})))
;; 
;; (-> bar (.append "rect")
;;     (.attr {:width   60
;;             :height  (.rangeBand y)})
;;     (.style {:fill   "white"
;;              :stroke "black"}))
;; 
;; (-> bar (.append "text")
;;     (.attr {:x  60
;;             :y  (/ (.rangeBand y) 2)
;;             :dx -6
;;             :dy ".35em"
;;             :text-anchor "end"})
;;     (.style "fill" "black")
;;     (.text identity))
;; 
;; ; forward decalaration since functions refer to each other
;; (declare data-to-bar bar-to-data)
;; 
;; ; DRY
;; (defn cur-click-fn [f]
;;   (-> d3 (.select js/window) (.on "click" f)))
;; 
;; (defn data-to-bar []
;;   (cur-click-fn bar-to-data)
;;   (-> bar (.transition)
;;     (.delay #(* %2 50))
;;     (.duration 1000)
;;     (.attr "transform" #(str "translate(0," (y %2) ")"))
;;     (.each "end" (fn [d i]
;;       (this-as this
;;         (let [t1 (-> d3 (.select this) (.transition)
;;                       (.duration 1000)
;;                       (.delay 250))]
;;           (-> t1 (.select "rect")
;;               (.attr "width" x)
;;               (.style {:fill   "indianred"
;;                        :stroke-opacity 0}))
;;           (-> t1 (.select "text")
;;               (.attr "x" x)
;;               (.style "fill" "white"))))))))
;; 
;; (defn bar-to-data []
;;   (cur-click-fn data-to-bar)
;;   (let [t0 (-> bar (.transition)
;;                 (.duration 1000)
;;                 (.attr "transform" #(str "translate(" (* %2 60) ")")))]
;;     (-> t0 (.select "rect")
;;         (.attr "width" 60)
;;         (.style {:fill   "white"
;;                  :stroke-opacity 1}))
;;     (-> t0 (.select "text")
;;         (.attr "x" 60)
;;         (.style "fill" "black"))))
;; 
;; ; initially click funciton is data-to-bar
;; (cur-click-fn data-to-bar)
