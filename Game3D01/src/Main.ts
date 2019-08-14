import GameConfig from "./GameConfig";
import GameBG from "./game/GameBG";
import GameMain from "./main/GameMain";
import {ui} from "./ui/layaMaxUI"
import App from "./core/App";
import LoginHttp from "./net/LoginHttp";
import ReceiverHttp from "./net/ReceiverHttp";
import PlatformID from "./platforms/PlatformID";
import { BasePlatform } from "./platforms/BasePlatform";
import HitType from "./game/ai/HitType";
import GameScaleAnimator1 from "./game/ai/GameScaleAnimator1";
import GameScaleAnimator2 from "./game/ai/GameScaleAnimator2";
import GameScaleAnimator4 from "./game/ai/GameScaleAnimator4";
import NPC_1001 from "./main/scene/battle/npc/NPC_1001";
import NPC_1002 from "./main/scene/battle/npc/NPC_1002";
import NPC_1003 from "./main/scene/battle/npc/NPC_1003";
import NPC_1001_view from "./main/scene/battle/npc/NPC_1001_view";
import NPC_1002_view from "./main/scene/battle/npc/NPC_1002_view";
import NPC_1003_view from "./main/scene/battle/npc/NPC_1003_view";
import AttackType from "./game/ai/AttackType";
import AIType from "./game/ai/AIType";
import BaseAI from "./game/ai/BaseAi";
import FlyAndHitAi from "./game/ai/FlyAndHitAi";
import FlowerAI from "./game/ai/FlowerAI";
import StoneAI from "./game/ai/StoneAI";
import TreeAI from "./game/ai/TreeAI";
import RandMoveAI from "./game/ai/RandMoveAI";
import MoveAndHitAi from "./game/ai/MoveAndHitAi";
import ReboundAI from "./game/ai/ReboundAI";
import JumpFollowAI from "./game/ai/JumpFollowAI";
import ArcherAI from "./game/ai/ArcherAI";
import MoveType from "./game/move/MoveType";
import FlyGameMove from "./game/move/FlyGameMove";
import PlaneGameMove from "./game/move/PlaneGameMove";
import FixedGameMove from "./game/move/FixedGameMove";
import JumpMove from "./game/move/JumpMove";
import BackMove from "./game/move/BackMove";
import TestPlatform from "./platforms/TestPlatform";
import WXPlatform from "./platforms/WXPlatform";

class Main {
	constructor() {
		//根据IDE设置初始化引擎	
		if (Laya.Browser.window.wx) {
			var win = Laya.Browser.window.wx.getSystemInfoSync();
			GameBG.height = GameBG.width / win.windowWidth * win.windowHeight;
		}	
		if (window["Laya3D"]) Laya3D.init(GameBG.width, GameBG.height);
		else Laya.init(GameBG.width, GameBG.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		//Laya.stage.scaleMode = GameConfig.scaleMode;
		//console.log(Laya.Stage.SCALE_FIXED_WIDTH);
		Laya.stage.bgColor = "#ffffff";
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
		//Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		// if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		if (Laya.Browser.window.wx) {
			Laya.URL.basePath = "https://img.kuwan511.com/arrowLegend/190809/";
		}
		

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onConfigLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		// Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
		// new GameMain();
	}

	onConfigLoaded(): void {
		this.loading = new ui.test.LoadingUI();
		Laya.stage.addChild(this.loading);
		this.loading.txt.text = "0%";
		// new GameMain();
		Laya.loader.load(["h5/config.json","res/atlas/main.png","res/atlas/main.atlas"],new Laya.Handler(this,this.onHandler),new Laya.Handler(this,this.onProgress));
	}



	private loading:ui.test.LoadingUI;
	private onHandler():void{
		let config = Laya.loader.getRes("h5/config.json");
		console.log("config---",config);
		App.platformId = config.platformId;
		App.serverIP = config.platforms[App.platformId];

		this.regClass();

		let BP = Laya.ClassUtils.getRegClass("p" + App.platformId);
		new BP().checkUpdate();

		new LoginHttp(new Laya.Handler(this,this.onSuccess)).checkLogin();
	}

	private onSuccess(data):void
	{
		ReceiverHttp.create(new Laya.Handler(this,this.onReceive)).send();
	}

	
    private onReceive(data):void
    {
		new GameMain();
		this.loading.removeSelf();
    }

	private onProgress(value:number):void
	{
		value = value * 100;
		this.loading.txt.text = "" + value.toFixed(0) + "%";
	}

	private regClass():void{
		var REG: Function = Laya.ClassUtils.regClass;
        //击退效果
        REG("HIT_" + HitType.hit1,GameScaleAnimator1);
        REG("HIT_" + HitType.hit2,GameScaleAnimator2);
        REG("HIT_"  + HitType.hit3,GameScaleAnimator4);
        //NPC
        REG("NPC1001",NPC_1001);
        REG("NPC1002",NPC_1002);
        REG("NPC1003",NPC_1003);

        REG("NPCVIEW1001",NPC_1001_view);
        REG("NPCVIEW1002",NPC_1002_view);
        REG("NPCVIEW1003",NPC_1003_view);
        //攻击类型
        REG(AttackType.TAG + AIType.NOTHAS,BaseAI);
        REG(AttackType.TAG + AIType.FLYHIT,FlyAndHitAi);
        REG(AttackType.TAG + AIType.BULLET,FlowerAI);
        REG(AttackType.TAG + AIType.STONE,StoneAI);
        REG(AttackType.TAG + AIType.TREE,TreeAI);
        REG(AttackType.TAG + AIType.RANDOM_MOVE,RandMoveAI);
        REG(AttackType.TAG + AIType.MOVEHIT,MoveAndHitAi);
        REG(AttackType.TAG + AIType.REBOUND,ReboundAI);
        REG(AttackType.TAG + AIType.JUMP_FOLLOW,JumpFollowAI);
        REG(AttackType.TAG + AIType.RED_LINE,ArcherAI);
        //移动类型
        REG(MoveType.TAG + MoveType.FLY,FlyGameMove);
        REG(MoveType.TAG + MoveType.MOVE,PlaneGameMove);
        REG(MoveType.TAG + MoveType.FIXED,FixedGameMove);
        REG(MoveType.TAG + MoveType.JUMP,JumpMove);
        REG(MoveType.TAG + MoveType.BACK,BackMove);
        //平台
        REG("p" + PlatformID.TEST,TestPlatform);
        REG("p" + PlatformID.WX,WXPlatform);
    }
}
//激活启动类
new Main();
