#pragma strict

import System.Collections.Generic;

public var laser : Transform; //the laser we will be shooting

public var playerSpeed : float = 2.0; //modifier
private var currentSpeed : float = 0.0; //curent speed
public var laserDistance : float = 0.2; //from the center, how far the laster will be
public var fireDelay : float = 0.3; //time in seconds before you shoot next
private var nextFire : float = 0.0;

public var upButton : List.<KeyCode>;
public var downButton : List.<KeyCode>;
public var leftButton : List.<KeyCode>;
public var rightButton : List.<KeyCode>;
public var shootButton : List.<KeyCode>;

//the last movement that we made
private var lastMovement : Vector3 = new Vector3();

function Update () {
	
	Rotation(); //Runs the Rotation script every frame
	Movement(); //Runs the Movement script every frame
	
	for (KeyCode in shootButton){
		
		if(Input.GetKey(KeyCode) && nextFire < 0){
			nextFire = fireDelay;
			Shoot();
			break;
		}

	}

	nextFire -= Time.deltaTime;

}

//Controls the rotation of the character
function Rotation () {
	//Tell where mouse is relative to player
	var worldPos : Vector3 = Input.mousePosition;
	worldPos = Camera.main.ScreenToWorldPoint(worldPos);

	//Get difference btwn axis
	var dx : float = this.transform.position.x - worldPos.x;
	var dy : float = this.transform.position.y - worldPos.y;

	//Get the angle btwn two object
	var angle : float = Mathf.Atan2(dy, dx) * Mathf.Rad2Deg;

	//Converts the angle to a vector
	var rot : Quaternion = Quaternion.Euler(new Vector3(0,0, angle + 90));

	//Assign the ship's rotation
	this.transform.rotation = rot;

}

//Controls the movement of the character
function Movement () {
	//Movement that needs to occur this frame
	var movement : Vector3 = new Vector3();

	//Check for input
	movement += MoveIfPressed(upButton, Vector3.up);
	movement += MoveIfPressed(downButton, Vector3.down);
	movement += MoveIfPressed(leftButton, Vector3.left);
	movement += MoveIfPressed(rightButton, Vector3.right);

	//Make sure we move same length with multiple buttons
	movement.Normalize();

	//Check if we pressed anything
	if(movement.magnitude > 0){
		//Move in that direction if we did
		currentSpeed = playerSpeed;
		this.transform.Translate(movement * Time.deltaTime * playerSpeed, Space.World);
		lastMovement = movement;
	}
	else {
		//Otherwise, move in direction we were going
		this.transform.Translate(lastMovement * Time.deltaTime * currentSpeed, Space.World);
		//slow down over time
		currentSpeed *= 0.9;
	}

}

//Will give the Movement Script information about buttons that have been pressed
private function MoveIfPressed(keyList : List.<KeyCode>, Movement : Vector3){

	for (KeyCode in keyList){
		if(Input.GetKey(KeyCode)){
			return Movement;
		}
	}
	return Vector3.zero;
}

public function Shoot(){

	var posX : float = this.transform.position.x + (Mathf.Cos((transform.localEulerAngles.z - 90) * Mathf.Deg2Rad) * -laserDistance);
	var posY : float = this.transform.position.y + (Mathf.Sin((transform.localEulerAngles.z - 90) * Mathf.Deg2Rad) * -laserDistance);

	Instantiate(laser, new Vector3 (posX, posY,0), this.transform.rotation);
}