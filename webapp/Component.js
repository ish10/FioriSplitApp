sap.ui.define(["sap/ui/core/UIComponent", "myapp/model/models"], 
function(UIComponent,omodel) {
    return UIComponent.extend("myapp.Component", {
        metadata: {
        	//important for manifest file to work and root directory name must end with . Component 
            "manifest" :"json"
        },
  init: function () {
            
            UIComponent.prototype.init.apply(this);
            var oRouter = this.getRouter();
            oRouter.initialize();
           
        },
        // createContent: function () {
        	
        	
        // //   var ocontainer = new sap.ui.view({
        // //   	viewName : "myapp.view.App",
        // //   	type:"XML"
        // //   });
        // //   var vie1 = new sap.ui.view("view1",{
        // //   	viewName : "myapp.view.view1",
        // //   	type:"XML"
        // //   });
        // //   var vie3 = new sap.ui.view("view3",{
        // //   	viewName : "myapp.view.Empty",
        // //   	type:"XML"
        // //   });
        // //   var vie2 = new sap.ui.view("view2",{
        // //   	viewName : "myapp.view.view2",
        // //   	type:"XML"
        // //   });
            
    
        // //  // var data= omodel.loaddata();
        // //   //ocontainer.setModel(data);
        // // var pa =  ocontainer.byId("imapp");
        // //         pa.addMasterPage(vie1);
        // //           pa.addDetailPage(vie3);
        // //          pa.addDetailPage(vie2);
        // //   return ocontainer;
        // },
        destroy: function(){
        	
        }

    });

});