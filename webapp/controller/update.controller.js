sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageToast"
], function(Controller,JSONModel,MessageToast) {
	"use strict";

	return Controller.extend("myapp.controller.update", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myapp.view.update
		 */
// 		 				onInit: function() {
// 	//	this.oRuter=this.getOwnerComponent().getRouter();
// 	//	this.oRuter.getRoute("update").attachMatched(this.ishpreet,this);
// 		//copy code 
// 	debugger;
// 		var iOriginalBusyDelay, oViewModel = new JSONModel({
// 				busy: true,
//  				delay: 0,
// 				productData: {}
// 			});
// 	this.getOwnerComponent().getRouter().getRoute("update").attachPatternMatched(this.ishpreet, this);
// 			// Store original busy indicator delay, so it can be restored later on
// 			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
// 			this.getView().setModel(oViewModel, "productView");
		
// 				this.getOwnerComponent().getModel().metadataLoaded().then(function() {
// // 				// Restore original busy indicator delay for the object view
// 			oViewModel.setProperty("/delay", iOriginalBusyDelay);

// 			});
		
		
		
			
// 			// Set the initial form to be the display one
// 			//this._showFormFragment("DisplayProduct");
// 		},
// 			ishpreet: function(oEvent) {
		
// 			var sObjectId = oEvent.getParameter("arguments").id;
// 			this.productId = sObjectId;
// 			this.getView().getModel().metadataLoaded().then(function(){
// 			this.getView().byId("imtext111").bindElement('/'+sObjectId);	
// 			}.bind(this));
	
// 	var oView = this.getView(),
			
// 				oViewModel = this.getView().getModel("productView"),
// 				oElementBinding = oView.getElementBinding();
// 			// No data for the binding
// debugger;
// 			var oObject = oView.getBindingContext().getObject();
// 				debugger;
// 			oViewModel.setProperty("/productData", oObject);
// 				oViewModel.setProperty("/busy", false);
		
// 		}
			onInit: function() {
	//	this.oRuter=this.getOwnerComponent().getRouter();
	//	this.oRuter.getRoute("update").attachMatched(this.ishpreet,this);
		//copy code 
	
		var iOriginalBusyDelay, oViewModel = new JSONModel({
				busy: true,
				delay: 0,
				toppings: [],
				productData: {}
			});
			this.getOwnerComponent().getRouter().getRoute("update").attachPatternMatched(this._onObjectMatched, this);
			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.getView().setModel(oViewModel, "productView");
		
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});
			
			// Set the initial form to be the display one
			//this._showFormFragment("DisplayProduct");
		},
		
		
		
		_onObjectMatched: function(oEvent) {
		
			var sObjectId = oEvent.getParameter("arguments").id;
			this.productId = sObjectId;
	
			this.getView().getModel().metadataLoaded().then(function() {
				//var sObjectPath = this.getModel().createKey("ProductsSet", {
				//	ProductId: sObjectId
			//	});
				this._bindView("/" + sObjectId);
			}.bind(this));
		},	
		
	_bindView: function(sObjectPath) {
			var oViewModel = this.getView().getModel("productView"),
				oDataModel = this.getView().getModel();
			
			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oDataModel.metadataLoaded().then(function() {
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},
			_onBindingChange: function() {
		
			var oView = this.getView(),
			
				oViewModel = this.getView().getModel("productView"),
				oElementBinding = oView.getElementBinding();
			// No data for the binding

			var oObject = oView.getBindingContext().getObject();
			
			oViewModel.setProperty("/productData", oObject);
			// Everything went fine.
			oViewModel.setProperty("/busy", false);
		},
		handleEditPress : function () {

			//Clone the data
			this._prodData = jQuery.extend({}, this.getView().getModel("productView").getData().productData);
			this._toggleButtonsAndView(true);

		},

		handleCancelPress : function () {

			//Restore the data
			var oModel = this.getView().getModel("productView");
			var oData = oModel.getData();

			oData.productData = this._prodData;

			oModel.setData(oData);
			this._toggleButtonsAndView(false);

		},
	
		handleSavePress : function () {
			
			//OData call to send data to backend
			var that = this;
			var oDataModel = this.getView().getModel();
			var payload = this.getView().getModel("productView").getProperty("/productData");
			oDataModel.update("/supplier_set('" + payload.BP_ID + "')", payload, {
				success: function(){
					MessageToast.show("Data updated successfully");
				},
				error: function(oError){
					that.getView().getModel("productView").setProperty("/productData", that._prodData);
					sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
				}
			});
			
			
			this._toggleButtonsAndView(false);

		},
			handleDelete: function(){
			var oDataModel = this.getView().getModel();
			var payload = this.getView().getModel("productView").getProperty("/productData");
			oDataModel.remove("/supplier_set('" + payload.BP_ID + "')", {
				success: function(){
					MessageToast.show("Product Deleted successfully");
				},
				error: function(oError){
					sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
				}
			});
		},

		_formFragments: {},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "ChangeProduct" : "DisplayProduct");
		},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "myapp.fragments." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},

		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}
// ishpreet:function(oEvent){
// 	debugger;
// 		var a= oEvent.getParameters();
// 	var b = a.arguments.id;
// 	//it bind with particular element
// 	this.getView().byId("imtext111").bindElement('/'+b);
	
//}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myapp.view.update
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myapp.view.update
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myapp.view.update
		 */
		//	onExit: function() {
		//
		//	}
	

	});

});