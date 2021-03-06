(ns semtag-web.start
  (:require [io.pedestal.app.protocols :as p]
            [io.pedestal.app :as app]
            [io.pedestal.app.render.push :as push-render]
            [io.pedestal.app.render :as render]
            [io.pedestal.app.messages :as msg]
            [semtag-web.services :as services]
            [semtag-web.route :as route]
            [semtag-web.behavior :as behavior]
            [semtag-web.rendering :as rendering]
            [semtag-web.history :as history]
            ;[semtag-web.debug :as debug]
            ;[ilshad.pedestal-introspector :as introspector]
            [clojure.string :as string]
            [goog.Uri]))

(defn- put-message-on-page-load [app screen params]
  ;; Ideally, :search-form effects could be triggered from rendering but this
  ;; causes history caching inconsistencies.
  (when (re-find #"^search" (name screen))
      (p/put-message (:input app) {msg/type :map-value msg/topic [:page] :value :search_form}))
  (p/put-message (:input app)
                 {msg/type :map-value msg/topic [:page] :value (name screen) :params params}))

(defn- update-behavior
  "Updates behavior with possible dynamic focus"
  [behavior route screen]
  (cond-> behavior
    true (assoc-in [:focus :default] screen)
    route (assoc-in [:focus screen]
                    (rendering/dynamic-paths route screen))))

(defn create-app [render-config]
  (let [params (route/parse-params window.location.hash)
        ;; For now we detect on hash. If I put a server to route all urls to this js app,
        ;; this could change to full urls.
        screen (or (route/url->screen (.-hash window.location) params)
                   (get-in behavior/app [:focus :default]))
        dynamic-route (route/find-dynamic-route (.-hash window.location))
        app (app/build (update-behavior behavior/app dynamic-route screen))
        render-fn (push-render/renderer "content" render-config render/log-fn)
        app-model (render/consume-app-model app render-fn)]
    ;; Ugh - this sucks
    ;; Consider reuse with rendering/dynamic-href-set-focus
    (when dynamic-route
      (swap! route/dynamic-screens assoc screen params))

    (app/begin app)
    (put-message-on-page-load app screen params)
    {:app app :app-model app-model}))

(defn setup-effects [app services-fn]
  (app/consume-effects (:app app) services-fn))

(defn param [name]
  (let [uri (goog.Uri. (.toString (.-location js/document)))]
    (.getParameterValue uri name)))

(defn ^:export main []
  (doto (create-app (rendering/render-config))
    ;; invoke with ilshad.pedestal_introspector.open()
    #_introspector/create
    (setup-effects services/services-fn)))
