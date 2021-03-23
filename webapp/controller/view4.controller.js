sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("myapp.controller.view4", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myapp.view.view4
		 */
			onInit: function() {
		this.oRoute = this.getOwnerComponent().getRouter();
			this.oRoute.getRoute("view4").attachMatched(this.herculis,this);
			},
			filterj :[],
herculis:function(oEvent){

	var a  = oEvent.getParameters();
	var arr = JSON.parse(a.arguments.ara);
	for(var i=0 ; i<arr.length ; i++){
	 this.filterj.push(new sap.ui.model.Filter("BP_ID",sap.ui.model.FilterOperator.Contains,arr[i]));
	 }
	var o = this.getView().byId("imsearch11");
	var p = o.getBinding("items");
	
p.filter(this.filterj);
}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myapp.view.view4
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myapp.view.view4
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myapp.view.view4
		 */
		//	onExit: function() {
		//
		//	}

	});

});