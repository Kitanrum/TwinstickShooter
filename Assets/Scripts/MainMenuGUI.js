#pragma strict

import System.Collections.Generic;

public var buttonWidth : int = 100;
public var buttonHeight : int = 30;
public var titleStyle : GUIStyle;
public var buttonStyle : GUIStyle;

function OnGUI(){

	//centers the button
	var buttonX : float = (Screen.width - buttonWidth)/2;
	var buttonY : float = (Screen.height - buttonHeight)/2;

	//show button, check if clicked
	if(GUI.Button(new Rect(buttonX, buttonY, buttonWidth, buttonHeight), "Start Game", buttonStyle)){
		//LoadLevel
		Application.LoadLevel(1);
	}

	GUI.Label(new Rect(buttonX + 2.5, buttonY - 50, 110, 20), "Twinstick Shooter", titleStyle);
}

  