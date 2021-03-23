sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("myapp.controller.view1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myapp.view.view1
		 */
			onInit: function() {
		this.oRute = this.getOwnerComponent().getRouter();
				this.oRute.getRoute("VIEW1").attachMatched(this.ishpreet,this);
			},
		ishpreet:function(oEvent){
	//debugger;
	var a= oEvent.getParameters();
	var b = a.arguments.fruitid;
	//it bind with particular element
	//this.getView().byId("imtext").bindElement(/fruits/+b);
	//it bind with whole view
	var oo=this.getView().byId("imlist");
},
onupdatepress:function(){
this.oRute.navTo("update");	
},
onhardpress:function(){

	this.oRute.navTo("view3");
},
onSearch :function(oEvent){

	 
	var f= oEvent.getParameter("query");
if (!f ) {
  // myVar is (not defined) OR (defined AND unitialized)
  var f= oEvent.getParameter("newValue");
}
if(f.indexOf("-") !== -1){
var oDataModel = this.getView().getModel();
oDataModel.read("/product_set('" +f+ "')",{
	success: function(data){
				var oDialog = new sap.m.Dialog({
							content: [
								new sap.ui.layout.form.SimpleForm({
									content: [
										new sap.m.Label({text: "ID"}),
										new sap.m.Text({text: data.PRODUCT_ID}),
										new sap.m.Label({text: "Name"}),
										new sap.m.Text({text: data.NAME}),
										new sap.m.Label({text: "Supplier"}),
										new sap.m.Text({text: data.SUPPLIER_NAME})
									]
								})	
							],
							title: "Product Checklist",
							endButton: new sap.m.Button({
								text: "Close",
								press: function(){
									oDialog.close();
								}
							})
						});
						oDialog.open();
					
	},
	error: function(oErr){
					
					}
});
}

else {
	var par = this.getView().byId("imlist");
 var item= par.getBinding("items");
	        var filter1 = new sap.ui.model.Filter("CATEGORY",sap.ui.model.FilterOperator.Contains,f);
	        // var filter2 = new sap.ui.model.Filter("type","EQ",f);
	          var filtermain = new sap.ui.model.Filter({
	          	 filters: [filter1

      

    ]
,

    and: false
	          });
	        item.filter(filtermain);
}
	 
},
multipleselection :function(oEvent){

	var o = oEvent.getParameter("listItems");
	for(var i=0; i<o.length	;i++){
		var a= o[i];
		console.log(a.getTitle());
	}

	
},
ondelete:function(oEvent){
	var o = oEvent.getParameter("listItem");
		var par = this.getView().byId("imlist");
		par.removeItem(o);
},
onpress: function(oEvent){

	var a= oEvent.getParameter("listItem");
    var b = a.getBindingContextPath();
   var idfruit= b.split("/");
    var id = idfruit[idfruit.length-1];
   
	// var c= this.getView().getParent().getParent();
	// var d =c.getDetailPages()[1];
	// 	debugger;
	//       var id = d.sId;
	//      var idt= d.byId("imtext");
	//      idt.bindElement(b);
	//       c.to(id);"fruits/{fruitid}",
	// debugger;
	this.oRute.navTo("VIEW1",{
		fruitid: id});
}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myapp.view.view1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myapp.view.view1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myapp.view.view1
		 */
		//	onExit: function() {
		//
		//	}

	});

});