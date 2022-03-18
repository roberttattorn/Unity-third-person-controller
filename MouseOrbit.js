#pragma strict

var target : Transform;
var left:Transform;
var richt:Transform;

var distance = 6.0;
private var dist = distance;
var xSpeed = 250.0;
var ySpeed = 120.0;

var yMinLimit = -20;
var yMaxLimit = 80;

//private var xtouch;


public var mobilemode:boolean = false;

private var x = 0.0;
private var y = 0.0;

//var hits: RaycastHit;
var ray;// = new Ray( target.position,transform.position);
var ray2;
var ray3;

@script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x+10;

	// Make the rigid body not change rotation
   	if (rigidbody)
		rigidbody.freezeRotation = true;
}

function Update () {   //  or lateupdate
   
   
    if (target) {
    if(mobilemode == false){
        x += Input.GetAxis("Mouse X") * xSpeed * 0.02;
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;}
        else
        {
        if (Input.GetMouseButton(0)  ){                  // simulates touch camera orbit
        
        if(Input.mousePosition.x-425>-220 && Input.mousePosition.x-425 <200)
         {
        x += Input.GetAxis("Mouse X") * xSpeed * 0.02;
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;
         }
        }
        }
 		
 		y = ClampAngle(y, yMinLimit, yMaxLimit);
 		
 		if(Input.GetKey (KeyCode.Joystick1Button6))   //rotate camera by joystick
 		x+=2;
 		if(Input.GetKey (KeyCode.Joystick1Button7))
 		x-=2;
 		       
        var rotation = Quaternion.Euler(y, x, 0);
        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
        
        transform.rotation = rotation;
        if (true)
        transform.position = position;
        //if Physics.Raycast(ray, hit) ||
        if ( transform.position.y<target.position.y-1.8 ){  //hit.distance  -> gets distance
 		transform.position.y = target.position.y-1.8;
 		}
    }
    //Debug.Log(transform.eulerAngles.x);  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ray = new Ray( target.transform.position,transform.position-target.transform.position);  //use RayCastAll to keep camera in walls
    var hits = Physics.RaycastAll(ray ,distance);
    for (hit in hits){
  if (hit.collider.gameObject.tag != "Player")
      transform.position = hit.point;  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      }
     
     ray2 = new Ray(target.transform.position,left.position-target.transform.position);
     var bits= Physics.RaycastAll(ray2 ,distance+0.3);
    for (hit in bits){
  if (hit.collider.gameObject.tag != "Player")
    transform.position = hit.point+transform.right*1.3;}//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ray3 = new Ray(target.transform.position,richt.position-target.transform.position);
     var tits= Physics.RaycastAll(ray3 ,distance+0.3);
    for (hit in tits){
  if (hit.collider.gameObject.tag != "Player")
    {transform.position = hit.point-transform.right*1.3;}
      //transform.position = transform.position+transform.worldToLocalMatrix.MultiplyVector(transform.forward)*0.1;  //world to local coords
      //Debug.Log("HIT!");
      } 
      if(Vector3.Distance(transform.position,target.position)<1)
      transform.position=target.position-Vector3.forward;
      Debug.Log(Vector3.Distance(transform.position,target.position));
}

     

static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}