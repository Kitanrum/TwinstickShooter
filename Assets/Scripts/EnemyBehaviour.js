#pragma strict

import System.Collections.Generic;

private var player : Transform;
public var explosion : Transform;
public var hitSound : AudioClip;
public var speed : float = 2.0;
public var health : int = 2.0;
public var damage : int = 1;

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
		GetComponent.<AudioSource>().PlayOneShot(hitSound);

	}

	if(health <=0) {
		Destroy(this.gameObject);
		var controller : GameController = GameObject.FindGameObjectWithTag("GameController").GetComponent("GameController") as GameController;
		controller.KilledEnemy();
		controller.IncreaseScore(10);

		if(explosion){
			var exploder : GameObject = Instantiate(explosion, this.transform.position, this.transform.rotation).gameObject;
			exploder.GetComponent.<AudioSource>().Play();
			Destroy(exploder, 2.0);
		}

			}
}