/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui {
    export class MainSceneUI extends Laya.View {
		public nowBtn:Laya.Button;
		public input:Laya.TextInput;
		public selectBtn:Laya.Button;
		public text:Laya.TextArea;
		public txt2:Laya.TextArea;
		public adBtn:Laya.Button;
		public cb1:Laya.ComboBox;
		public box:Laya.Box;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("MainScene");
        }
    }
    REG("ui.MainSceneUI",MainSceneUI);
    export class txtCellUI extends Laya.View {
		public idTxt:Laya.Label;
		public strTxt:Laya.Label;
		public countTxt:Laya.Label;
        public static  uiView:any ={"type":"View","props":{"width":750,"height":34},"compId":2,"child":[{"type":"Label","props":{"y":0,"x":0,"width":100,"var":"idTxt","text":"label","height":34,"fontSize":30,"color":"#f9f4f4","bold":true},"compId":3},{"type":"Label","props":{"y":0,"x":156,"width":432,"var":"strTxt","text":"label","height":34,"fontSize":30,"color":"#f9f4f4","bold":true},"compId":4},{"type":"Label","props":{"y":0,"x":650,"width":100,"var":"countTxt","text":"label","height":34,"fontSize":30,"color":"#f9f4f4","bold":true},"compId":5}],"loadList":[],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(txtCellUI.uiView);
        }
    }
    REG("ui.txtCellUI",txtCellUI);
}