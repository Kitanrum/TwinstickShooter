#pragma strict

enum Menu{None, Pause, Options};
private var currentMenu : Menu;

public static var isPaused : boolean;
public var windowWidth : float = 256;
public var windowHeight : float = 100;

public var newSkin : GUISkin;

public function Start () {
	//We don't want the game paused when it starts and/or resets
	isPaused = false;
	currentMenu = Menu.None;

}


public function OnGUI(){

	GUI.skin = newSkin;

	if(isPaused && currentMenu == Menu.None){
		currentMenu = Menu.Pause;
	}
	if(currentMenu == Menu.None){
		Time.timeScale = 1;
	}

	Time.timeScale = 0;

	switch(currentMenu){
		case Menu.Options:
			ShowOptionsMenu();
			break;
		case Menu.Pause:
			ShowPauseMenu();
			break;
	}
}

public function BuildWindow(){

	var windowX : float = (Screen.width - windowWidth)/2;
	var windowY : float = (Screen.height - windowHeight)/2;

	GUILayout.BeginArea(new Rect (windowX, windowY, windowWidth, windowHeight));
}

public function ShowPauseMenu(){

	BuildWindow();

	GUILayout.BeginHorizontal();

	if(GUILayout.Button("Resume")){
		//resume the game
		isPaused = false;
		currentMenu = Menu.None;
	} 
	if(GUILayout.Button("Restart")){
		Application.LoadLevel(Application.loadedLevelName);
	}
	GUILayout.EndHorizontal();

	if(GUILayout.Button("Options")){
		currentMenu=Menu.Options;
	}

	GUILayout.BeginHorizontal();

	if(GUILayout.Button("Main Menu")){
		Application.LoadLevel(0);
	}
	if(GUILayout.Button("Exit Game")){
		Application.Quit();
	}
	GUILayout.EndHorizontal();

	GUILayout.EndArea();
}

public function ShowOptionsMenu(){

	BuildWindow();

	GUILayout.BeginVertical("box");

	GUILayout.Label("Master Volume - (" + AudioListener.volume.ToString ("f2") + ")");
	AudioListener.volume = GUILayout.HorizontalSlider(AudioListener.volume, 0,1);

	var currentQuality : int = QualitySettings.GetQualityLevel();
	var qualityName : String = QualitySettings.names[currentQuality];
	GUILayout.Label ("Quality - " + qualityName);

	GUILayout.BeginHorizontal();

	if(GUILayout.Button("Decrease")){
		QualitySettings.DecreaseLevel();
	}
	if(GUILayout.Button("Increase")){
		QualitySettings.IncreaseLevel();
	}

	GUILayout.EndHorizontal();

	if(GUILayout.Button("Back")){
		currentMenu = Menu.Pause;
	}

	GUILayout.EndVertical();

	GUILayout.EndArea();

}