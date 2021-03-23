sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/m/MessageToast"
], function(Controller,Messagebox,Messagetoast) {
	"use strict";

	return Controller.extend("myapp.controller.view2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myapp.view.view2
		 */
			onInit: function() {
		this.oRuter=this.getOwnerComponent().getRouter();
		this.oRuter.getRoute("VIEW1").attachMatched(this.ishpreet,this);
			},
idstore : "",
onEdittoupdate:function(oEvent){
	debugger;
	var a = oEvent.getSource();
var b=	a.getBindingContext().sPath;
 var idfruit= b.split("/");
    var ids = idfruit[idfruit.length-1];
this.oRuter.navTo("update",{id :ids});	
},
ishpreet:function(oEvent){
    debugger;
	var a= oEvent.getParameters();
	var b = a.arguments.fruitid;
	//it bind with particular element
	this.getView().byId("imtext11").bindElement('/'+b);
	//it bind with whole view
	//this.getView().bindElement( '/'+b);
	this.getView().byId("supplier").bindElement('/'+b+"/TO_SUPPLIER");
},
onselectionChange:function(oEvent){

	var o = oEvent.getParameter("selectedItem");
	var city= o.getLabel();
	sap.ui.getCore().byId(this.idstore).setValue(city);
	
},
onSupplierSearch:function(oEvent){
var o= oEvent.getParameter("query");	
var id = this.getView().byId("imsearch1");
var ofilter = new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains,o);
id.getBinding("items").filter([ofilter]);
},
cityPopup: null,
suppPopup: null,
onValueHelp :function(oEvent){
	this.idstore=oEvent.getSource().getId();
	if(!this.cityPopup)
	{
	this.cityPopup=sap.ui.xmlfragment("myapp.fragments.popup",this);	
	this.cityPopup.bindAggregation("items",{
					path: "/city_set",
					template: new sap.m.DisplayListItem({
						label: "{LAND1}",
						value: "{LANDK}"
					})
				});
				this.cityPopup.setMultiSelect(false);
				this.getView().addDependent(this.cityPopup);
	}
	this.cityPopup.open();
},
	
popup:function(oEvent){
if(!this.suppPopup)	{
	this.suppPopup=sap.ui.xmlfragment("myapp.fragments.popup",this);
		this.suppPopup.bindAggregation("items",{
					path: "/supplier",
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{type}"
					})
				});
				this.getView().addDependent(this.suppPopup);
}
this.suppPopup.open();
},
	onPopupSearch2: function(oEvent){
				var toBeSearched = oEvent.getParameter("value");
				var nameOfPopup = oEvent.getParameter("itemsBinding").getPath();
				if(nameOfPopup.indexOf("cities") !== -1){
					var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, toBeSearched);
					this.cityPopup.getBinding("items").filter([oFilter]);
				}else{
					oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, toBeSearched);
					this.suppPopup.getBinding("items").filter([oFilter]);
				}
		},
 
onbuttonpress: function(){
	Messagebox.confirm("i m here ",{
  actions: [ Messagebox.Action.OK,
               Messagebox.Action.Cancel ],
	title: "Confirm",                                    // default
    onClose: function(sButton) {
        if (sButton === Messagebox.Action.OK) {
            Messagetoast.show("imin");
        	}
        if (sButton === Messagebox.Action.Cancel){
        	Messagetoast.show("imout");
        }                                   
		
}
	});
}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myapp.view.view2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myapp.view.view2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myapp.view.view2
		 */
		//	onExit: function() {
		//
		//	}

	});

});