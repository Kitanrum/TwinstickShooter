#pragma strict

import System.Collections.Generic;

public var enemy : Transform;

public var timeBeforeSpawning : float = 1.5;
public var timeBetweenEnemies : float = .25;
public var timeBeforeWaves : float = 2.0;

public var enemiesPerWave : float = 10.0;
private var currentNumberOfEnemies : float = 0;

private var score : int = 0;
private var waveNumber = 0;
public var lives : int = 5;

public var scoreText : UI.Text;
public var waveText : UI.Text;
public var livesText : UI.Text;


function Update () {
	StartCoroutine(SpawnEnemies());
}

function SpawnEnemies(){

	yield WaitForSeconds(timeBeforeSpawning);

	while(true){

		if(currentNumberOfEnemies <= 0){
			var randDirection : float;
			var randDistance : float;

			waveNumber++;
			waveText.text = "Wave: " + waveNumber;

			for (var i : int = 0; i < enemiesPerWave; i++){

				randDistance = Random.Range(10,25);
				randDirection = Random.Range(0,360);

				var posX : float = this.transform.position.x + (Mathf.Cos((randDirection) * Mathf.Deg2Rad) * randDistance);
				var posY : float = this.transform.position.y + (Mathf.Sin((randDirection) * Mathf.Deg2Rad) * randDistance);

				Instantiate(enemy, new Vector3 (posX, posY, 0), this.transform.rotation);
				currentNumberOfEnemies++;

				yield WaitForSeconds(timeBetweenEnemies);

			}
		}

		yield WaitForSeconds(timeBeforeWaves);
	}
}

public function KilledEnemy(){
	currentNumberOfEnemies--;
}

public function IncreaseScore(increase : int){
	score += increase;
	scoreText.text = "Score: " + score;
}