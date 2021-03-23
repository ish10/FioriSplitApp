sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageToast"
], function(Controller,JSONModel,MessageToast) {
	"use strict";

	return Controller.extend("myapp.controller.view3", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myapp.view.view3
		 */
			onInit: function() {
				this.oRoute =this.getOwnerComponent().getRouter();
		var oLocalModel = new JSONModel();
	oLocalModel.setData({
			"productData": {
								"PRODUCT_ID": "",
								"TYPE_CODE": "PR",
								"CATEGORY": "Notebooks",
								"NAME": "",
								"DESCRIPTION": "New Supersonic Laptop",
								"SUPPLIER_ID": "",
								
								"PRICE": "",
								"CURRENCY_CODE": "EUR",
								"DIM_UNIT": "CM"
							}
		});
		this.getView().setModel(oLocalModel,"localView");
			},
			onSave: function(){
				var o = this.getView().getModel("localView").getProperty("/productData");
				var omodel= this.getView().getModel();
				omodel.create("/product_set", o, {
					success:function(data){
					MessageToast.show("record created successfully");
					
					},
					error:function(msg){
						MessageToast.show("record not created");	
					}
				});
			},
			onfunctionimport:function(){
				var odata= this.getView().getModel();
				var that=this;
				odata.callFunction("/GetMostExpensiveProduct",{
					urlParameters:{
						I_CATEGORY :"Notebooks"
					},
					success:function(data){
				
					var omodel= that.getView().getModel("localView");
					omodel.setProperty("/productData",data);
					
					},
					error:function(error){
							MessageToast.show("error");
					}
				});
			},
			suppPopup: null,
			onvaluehelp:function(oEvent){
				this.id= oEvent.getSource();
				if(!this.suppPopup)	{
	this.suppPopup=sap.ui.xmlfragment("myapp.fragments.popup",this);
				this.suppPopup.bindAggregation("items",{
					path: "/supplier_set",
					template: new sap.m.DisplayListItem({
						label: "{COMPANY_NAME}",
						value: "{BP_ID}"
					})
				});
				this.getView().addDependent(this.suppPopup);          		
					
				}
	this.suppPopup.open();
			
			},
		 val : [],	
			onselectionChange:function(oEvent){
			
			//	var value=oEvent.getParameter("selectedItem").getLabel();
			
				//this.id.setValue(value);
				var value=oEvent.getParameter("selectedItems");
				for(var i=0 ; i < value.length ; i++){
				this.val.push( value[i].getValue());
				}
			
			},
			onnext:function(){
				this.oRoute.navTo("view4",{ara:JSON.stringify(this.val)
					
				});
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myapp.view.view3
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myapp.view.view3
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myapp.view.view3
		 */
		//	onExit: function() {
		//
		//	}

	});

});