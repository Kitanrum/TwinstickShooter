#pragma strict

import System.Collections.Generic;

public var lifetime : float = 2.0; //How long the laser will live
public var speed : float = 5.0; //How fast the laser will move
public var damage : int = 1; //How much damage the laser does

function Start () {

	//Delete the object after it 'dies'
	Destroy(gameObject, lifetime);

}

function Update () {

	transform.Translate(Vector3.up * Time.deltaTime * speed);

}