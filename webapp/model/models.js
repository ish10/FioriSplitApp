sap.ui.define([],function(){
return{
	loaddata: function(){
var oModel =  new sap.ui.model.json.JSONModel();
	oModel.loadData("model/data/data.json");	
		
return oModel;		
	}
};	
});