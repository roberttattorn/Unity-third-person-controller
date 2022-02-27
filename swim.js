#pragma strict
private var point:Vector3 ;
private var dist;
private var inwater = false;
private var dive = false;
private var velocity:float;
private var lastpos;
static var hit: RaycastHit;
private var position;
private var buoyancy:float;
static var canjump=false;
static var jumping =false;
static var underwater=false;
public var bubble:GameObject;
private var depth:float;
private var ascending=false;
private var jumpbutton=false;

function Start () {
bubble.SetActive(false);
point = new Vector3(transform.position.x,transform.position.y+50,transform.position.z);  //only works here
position = new Vector3(transform.position.x,transform.position.y+1.3,transform.position.z);
dist = Vector3.Distance(point,position);
//Debug.Log(dist);
}
                                                  //hit.point  is the point of ray hit with mesh
function Update () {
inwater=false;
jumpbutton=Input.GetButton("Jump");  //made mistake of getbuttondown instead of getbutton
point = new Vector3(transform.position.x,transform.position.y+50,transform.position.z);
//static var hit: RaycastHit;
var ray = new Ray( point,-transform.up);         //use RayCastAll to pass through all colliders
 var hits = Physics.RaycastAll(ray ,dist);  // the dist is the length to check for ray hit
 for (hit in hits){
  if (hit.collider.gameObject.tag == "water"){   // check if hit water
  inwater=true;
  depth = hit.point.y-transform.position.y;
   //Debug.Log("WATER!");
   velocity=Vector3.Distance(transform.position,lastpos);
   InWater();
  }
 }
     // Physics.Raycast(point, -Vector3.up,hit ,dist)
     lastpos = transform.position;
     if(underwater)
     bubble.SetActive(true);
     else
     bubble.SetActive(false);
     if(jumpbutton && underwater==true)
      ascending=true;
      else
      {
       ascending=false;}
      //if(jumpbutton)
      //Debug.Log(jumpbutton);
}

function InWater(){
if(velocity>0.03 && jumping==false)
 {animation.CrossFade("dive");
  animation.wrapMode = WrapMode.Loop;
 }
 if(velocity<=0.03 /*&& !animation.IsPlaying("swim")*/)
 {if(underwater==false)
 animation.CrossFade("swim");
 else
 animation.CrossFade("underwater");
 animation.wrapMode = WrapMode.Loop;
 }
 buoyancy=Mathf.Sin(Time.deltaTime)*0.4;
 if(transform.position.y<hit.point.y)  //buoyancy
 transform.position.y+=(hit.point.y-transform.position.y)*0.25+buoyancy;
 if(depth<=1.48)
 {canjump=true;underwater=false;}
 else
 {canjump=false;
  if(depth>1.48)
  underwater=true;
 }
 if(jumpbutton&& canjump==true && jumping==false && underwater==false)
 jumping=true;
 
 
 //Debug.Log(ascending);
}




