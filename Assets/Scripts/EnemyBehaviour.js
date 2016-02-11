#pragma strict

import System.Collections.Generic;

private var player : Transform;
public var speed : float = 2.0;
public var health : int = 2.0;

function Start () {

	player = GameObject.Find("playerShip").transform;

}

function Update () {

	Movement();

}

function Movement(){

	var delta : Vector3 = player.position - transform.position;
	delta.Normalize();
	var moveSpeed : float = speed * Time.deltaTime;
	transform.position = transform.position + (delta * moveSpeed);

}

function OnCollisionEnter2D(theCollision : Collision2D){

	Debug.Log("Hit" + theCollision.gameObject.name);

	if(theCollision.gameObject.name.Contains("laser")){

		var laser : LaserBehaviour = theCollision.gameObject.GetComponent("LaserBehaviour") as LaserBehaviour;
		health -= laser.damage;
		Destroy (theCollision.gameObject);

	}

	if(health <=0) {
		Destroy(this.gameObject);
		var controller : GameController = GameObject.FindGameObjectWithTag("GameController").GetComponent("GameController") as GameController;
		controller.KilledEnemy();
			}
}