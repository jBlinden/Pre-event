var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


router.get('/', function(req,res){
  res.render('Login',{layout: 'second'});});

router.get('/Login', function(req,res){
  res.render('Login',{layout: 'second'});});

router.get('/SignUp', function(req,res){
  res.render('SignUp',{layout: 'second'});});


router.get('/test', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
  res.render('Notifications',{layout: false});
});
router.get('/pastEvt', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
   {
   var MongoClient = mongodb.MongoClient;
   var url = 'mongodb://localhost:27017/preeventdb'; // Define where the MongoDB server is
   MongoClient.connect(url, function (err, db){	
   if (err){
			console.log('Unable to connect to the Server', err);
		} else {
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('Events');
			collection.find({"eBy":req.session.username,"past":true}).toArray(function (err, result) {// Find all students
				if (err) {
					res.send(err);
				} else if (result.length) {
					res.render('pastEvt',{
					"eventlist" : result,"Notification":""
					});
				} else {
					res.render('pastEvt',{"Notification":"<tr><td>You have no past events.</td></tr>"});
				}
				db.close(); //Close connection
			});
		}});
	}
});




router.get('/calendar', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
  res.render('Calendar');
});


router.get('/home', function(req,res){
  res.send("Hello")
});
router.get('/CreEvt', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
  res.render('CreateEvt');
});


router.get('/Profile', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
   {
   var MongoClient = mongodb.MongoClient;
   var url = 'mongodb://localhost:27017/preeventdb'; // Define where the MongoDB server is
   MongoClient.connect(url, function (err, db){	
   if (err){
			console.log('Unable to connect to the Server', err);
		} else {
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('Users');
			collection.find({"Email":req.session.username}).toArray(function(err,result){// Find all students
				if (err) {
					res.send(err);
				} else if (result.length) {
					res.render('Profile',{
					"Userinfo" : result
					});
				} else {
					res.send("Cannot Load Database")
				}
				db.close(); //Close connection
			});
		}});
	}
});




router.get('/UsrEvents', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
   {
   var MongoClient = mongodb.MongoClient;
   var url = 'mongodb://localhost:27017/preeventdb'; // Define where the MongoDB server is
   MongoClient.connect(url, function (err, db){	
   if (err){
			console.log('Unable to connect to the Server', err);
		} else {
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('Events');
			collection.find({"eBy":req.session.username,"past":false}).toArray(function (err, result) {// Find all students
				if (err) {
					res.send(err);
				} else if (result.length) {
					res.render('UsrEvents',{
					"eventlist" : result,"Notification":""
					});
				} else {
					res.render('UsrEvents',{"Notification":"<tr><td>You have no events you can create an event on the Create Event page.</td></tr>"});
				}
				db.close(); //Close connection
			});
		}});
	}
});
router.get('/OthEvents', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
   {
   var MongoClient = mongodb.MongoClient;
   var url = 'mongodb://localhost:27017/preeventdb'; // Define where the MongoDB server is
   MongoClient.connect(url, function (err, db){	
   if (err){
			console.log('Unable to connect to the Server', err);
		} else {
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('Events');
			var invitees=collection.find({"Invitees.iName": req.session.username}).toArray( function (err,result)
			{
			if (err)
				res.send(req.session.username);
			else
			{
			res.render('OthEvents',{
					"eventlist" : result
					});
			db.close(); //Close connection
			}
			});
			
			//var invitees = collection.find('Invitees').forEach(function())
		}});
	}
});

router.get('/EditEvt', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
  res.render('EditEvt');
});


router.get('/ApplyEvt', function(req,res){
   var taski = req.param('eId');
   taski=taski.toString().trim();
   console.log(taski);
  // var name= new mongo.ObjectId(taski);
  // console.log(name);
	if (req.session.username=="" || req.session.username==null)
  		res.redirect("Login");
	else{
		var MongoClient = mongodb.MongoClient;
		var url = 'mongodb://localhost:27017/preeventdb'; // Define where the MongoDB server is
		console.log("Yes")
		MongoClient.connect(url, function (err, db){	
		if (err){
				console.log('Unable to connect to the Server', err);
			} else {
				console.log('Connection established to', url);
				// Get the documents collection
				console.log("a");
				var collection = db.collection('Events');

				collection.find(new mongodb.ObjectId(taski)).toArray(function(err,result){
				//console.log("AA");
				//collection.find(name).toArray(function(err,result){
					if (err)
						res.send("ERROR 1");
					else if(result.length){
						console.log(result);
						res.render('ApplyEvt',{
							"eventlist" : result
							}
						);	
					}		
					else{
						res.send("ERROR 2")
					}
					db.close();

				});
				
			}	
		});
	}	
});







router.get('/Notification', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
  {
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb';
	MongoClient.connect(url, function(err, db)
	{ // Connect to the server
		if (err) {
			console.log('Unable to connect to the Server:', err);
		}else {
			console.log('Connected to Server');
			var collection = db.collection('Events'); // Get the documents collection
			collection.find({"Invitees.iName": req.session.username}).toArray(function(err,result)
			{
				if (err)
					res.send("ERROR CANNOT FIND DB")
				else if(result.length)
				{
					var array=result[0].first
					var boolean = false;
					var final=[];
					var thankyou=[];
					console.log("UMs");
					for(var x=0;x<result.length;x++)
					{
						console.log(x);
						for(var y=0;y<result[x].Invitees.length;y++)
						{
							console.log(y);
							console.log(result[x].Invitees[y].iName + ":" + req.session.username);
							if (result[x].Invitees[y].iName==req.session.username)
							{
								console.log(result[x].Invitees[y].iPos);
								if (result[x].Invitees[y].iPos=="Yes")
								final.push({"Invited":("You can make the " + result[x].eName + ". The event is on " + result[x].bDate + " at " + result[x].bTime + ".")});
								if (result[x].Invitees[y].iPos=="No")
								final.push({"Invited":("You cannot make the " + result[x].eName)});
							}
						}
						if (result[x].eBy==req.session.username)
						{
							var z=[];
							for (var y=0;y<result[x].Invitees.length;y++)
							{
								if (result[x].Invitees[y].iPos=="Yes")
								thankyou.push({"CanGo":(result[x].Invitees[y].iName + " can go to your " + result[x].eName)});
								if (result[x].Invitees[y].iPos=="No")
								thankyou.push({"CanGo":(result[x].Invitees[y].iName + " cannot go to your " + result[x].eName)});
							}
						}
					}
					console.log("UM");
					if (final.length==0 && (thankyou.length==0 || thankyou[0]==null)){	
						var something="<tr><td>You have no notifications at this time please check back later</td></tr>";
					}
					else{
						var something="";
					}
					console.log(final);
					console.log(thankyou);
					res.render("Notification",{"finallist":final,"tylist":thankyou,"Something":something});
				}
				else{
					res.render("Notification");
				}
				db.close();	
			});
			
		}
	});
  }
});












router.get('/DP', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
  res.render('DP');});
  
router.get('/JB', function(req,res){
  if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
  else
  res.render('JB');});

router.get('/listcookies',function(req,res){
   if (req.session.username=="" || req.session.username==null)
  	 res.redirect("Login");
    else
   res.send("");});

router.get("/logout", function(req,res){
	req.session.username=null;
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb'; // Define where the MongoDB server is
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the Server', err);
		} else {
			// We are connected
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('Events');
			collection.find({}).toArray(function(err,result){
				if (err){
					res.send(err);
					//return;
				}
				else
				{
					for(var x=0;x<result.length;x++)
					{
						var d=new Date();
						var date=d.getDate();
						var array=result[x].bDate.split("-")
						var day=array[2];
						console.log(date +":" + day);
						if (parseInt(date)>parseInt(day))
						{
							collection.update(new mongodb.ObjectId(result[x]._id),{$set:{"past":true}});
							console.log("CHANGE");
						}

					}
				}
				db.close(); 
			});
		}
	});
	res.redirect("Login");
});


router.get('/MngEvent', function(req,res){
	var taski = req.param('event');
	taski=taski.toString();
	console.log(taski.toString());
	if (req.session.username=="" || req.session.username==null)
		 res.redirect("Login");
	else{
		var MongoClient = mongodb.MongoClient;
		var url = 'mongodb://localhost:27017/preeventdb'; // Define where the MongoDB server is
		MongoClient.connect(url, function (err, db){	
			if (err){
				console.log('Unable to connect to the Server', err);
			}else {
				console.log('Connection established to', url);
				// Get the documents collection
				var collection = db.collection('Events');
				collection.find({"eBy":req.session.username,"eName":taski}).toArray(function (err, result) {// Find all students
					if (err) {
						res.send(err);
					} else if (result.length) {
						var tempcount=result[0].tempcount;
						var Time;
						var oDate;
						var tim = new Array(result[0].count / result[0].tempcount);
						var max =0;
						var maxi=0;
						for(var i =0; i <tim.length; i++){
							tim[i] = 0;
							for(var j = 0; j<tempcount; j++){
								console.log((i*(tempcount)) + j);
								if(result[0].first[(i*(tempcount)) + j].iPos == "Yes")
									tim[i] +=1;
							}
							if(tim[i] > max){
								maxi = i;
								max = tim[i];
							}
							console.log(max);
						}
						if(max == 0){
							Time = "NONE";
							oDate = "NONE";
							maxi = 0;
						}
						else{

							console.log("Ap");
							for(var i = 0; i<tempcount; i++){
								console.log("Ay");
								var temparray=result[0].Invitees;
								var y=temparray[i].iName;
								console.log(maxi +" " + tempcount + "  " + i);
								if(result[0].first[maxi*tempcount + i].iPos == "Yes")
								{
									console.log(taski + " " + y);
									collection.update({"eBy":req.session.username,"eName":taski,"Invitees.iName":y},{$set:{"Invitees.$.iPos":"Yes"}});
									result[0].Invitees[i].iPos = "Yes";
								}
								else if(result[0].first[maxi*tempcount + i].iPos == "No")
								{
									collection.update({"eBy":req.session.username,"eName":taski,"Invitees.iName":y},{$set:{"Invitees.$.iPos":"No"}});		
									console.log("Annie Can Come!");
									result[0].Invitees[i].iPos = "No";
								}
								else
								{
									collection.update({"eBy":req.session.username,"eName":taski,"Invitees.iName":y},{$set:{"Invitees.$.iPos":"Unknown"}});
									result[0].Invitees[i].iPos = "Unknown";
								}
							}
							Time = result[0].first[(maxi*result[0].tempcount)].eTimes;
							oDate = result[0].first[(maxi*result[0].tempcount)].eDates;
							collection.update({"eBy":req.session.username,"eName":taski},{$set:{"bTime":Time,"bDate":oDate}})
							console.log("IMPORTANT");
							var today = new Date();
							var Time1 = parseFloat(Time);
							Time1 = Time1 * 60 * 60 * 1000
				            var BigDay = oDate;
				            var date=new Date(oDate.toString());
				            console.log(date);
				            var msPerDay = 24 * 60 * 60 * 1000 ;
				            console.log(msPerDay);
				            var timeLeft = (date.getTime() +Time1 - today.getTime());
				            console.log(timeLeft);
				            var e_daysLeft = timeLeft / msPerDay;
				            console.log(e_daysLeft);
				            var daysLeft = Math.floor(e_daysLeft);
				            console.log(daysLeft);
				            var e_hrsLeft = (e_daysLeft - daysLeft)*24;
				            console.log(e_hrsLeft);
				            var hrsLeft = Math.floor(e_hrsLeft);
				            console.log(hrsLeft);
				            var minsLeft = Math.floor((e_hrsLeft - hrsLeft)*60);
				            console.log(minsLeft);
				            var TLeft = ("There are about " + daysLeft + " days left before your event.");
						}
						console.log(result);
						res.render('MngEvent',{
							"eventlist" : result,
							"name":taski,
							"bTime":Time,
							"bDate":oDate,
							"tLeft":TLeft
						});
					} else {
						res.send('ERROR');
					}
					db.close(); //Close connection
				});
			}});
	}
});


router.post('/check', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb'; // Define where the MongoDB server is
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the Server', err);
		} else {
			// We are connected
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('Users');
			var username=req.body.Email;
			var password=req.body.password;
			collection.find({"Email":username,"password":password}).toArray(function(err,result){
				if (err){
					res.send(err);
					//return;
				}
				else if(result.length){
					//console.log(result[0].Email);
					req.session.username = username;
					res.redirect('Notification');
				}
				else{
					console.log('Password did not match');
					res.send('Password or Username was Incorrect');
				}
				db.close(); 
			});
		}
	});
	//Close connection
});


//Checking Login Info
router.post('/update', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb';
	MongoClient.connect(url, function(err, db){ // Connect to the server
		if (err) {
			console.log('Unable to connect to the Server:', err);
		} else {
			console.log('Connected to Server');
			var collection = db.collection('Events'); // Get the documents collection
			var email = req.session.username;
			var name = req.body.name;
			if (!(req.body.i1=="" || req.body.i1==null))
				collection.update({eName:name,eBy:email}, {$push:{"Invitees":{"iName":req.body.i1,"iPos":"Unknown"}}});
			if (!(req.body.i2=="" || req.body.i2==null))
			collection.update({eName:name,eBy:email}, {$push:{"Invitees":{"iName":req.body.i2,"iPos":"Unknown"}}});
			if (!(req.body.i3=="" || req.body.i3==null))
			collection.update({eName:name,eBy:email}, {$push:{"Invitees":{"iName":req.body.i3,"iPos":"Unknown"}}});
			if (!(req.body.i4=="" || req.body.i4==null))
			collection.update({eName:name,eBy:email}, {$push:{"Invitees":{"iName":req.body.i4,"iPos":"Unknown"}}});
			if (!(req.body.i5=="" || req.body.i5==null))
			collection.update({eName:name,eBy:email}, {$push:{"Invitees":{"iName":req.body.i5,"iPos":"Unknown"}}});
		    db.close();
		    res.redirect("Notification");
		}
	}); 
});
router.get('/delete', function(req,res){
	var taski = req.param('event');
    taski=taski.toString();
    console.log(taski);
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb';
	MongoClient.connect(url, function(err, db){ // Connect to the server
		if (err) {
			console.log('Unable to connect to the Server:', err);
		} else{
			var collection = db.collection('Events');
			collection.remove({"eBy":req.session.username,"eName":taski})
			db.close();
			res.render("UsrEvents");
	}});
});
router.post('/adduser', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb';
	MongoClient.connect(url, function(err, db){ // Connect to the server
		if (err) {
			console.log('Unable to connect to the Server:', err);
		}else {
			console.log('Connected to Server');
			var collection = db.collection('Users'); // Get the documents collection
			var email = req.body.email;
			var unique = collection.find({"Email":email}).toArray();
			var user1 = {fName:req.body.firstname,lName:req.body.lastname, Age:req.body.age,Email:email, password:req.body.pswd};
			collection.insert([user1], function (err, result){
				if (err) {
					res.send(err)
				} else {
					req.session.username = email;
					
					res.redirect("Notification");
				}
				db.close();
			});
		}
}); });
router.post('/annie', function(req, res){
	var taski = req.param('eId');
    taski=taski.toString();
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb';
	console.log(taski);
	MongoClient.connect(url, function(err, db){ // Connect to the server
		if (err) {
			console.log('Unable to connect to the Server:', err);
		}else {
			console.log('Connected to Server');
			var collection = db.collection('Events'); // Get the documents collection
			collection.find(new mongodb.ObjectId(taski)).toArray(function(err,result){
			if (err)
				res.send("ERROR CANNOT FIND DB")
			else if(result.length)
			{
			var tempcount=result[0].tempcount;
			var temparray=result[0].Invitees;
			var index=0;
			for(var x=0;x<temparray.length;x++)
			{
				if (temparray[x].iName==req.session.username)
					index=(x);


			}
			var number=(result[0].count/result[0].tempcount);
			for(var x=0;x<(number);x++){
				var temp="";
				if (x==0)
				var unique=req.body.check0;
				if (x==1)
				var unique=req.body.check1;
				if (x==2)
				var unique=req.body.check2;
				if (x==3)
				var unique=req.body.check3;
				if (x==4)
				var unique=req.body.check4;
				if (x==5)
				var unique=req.body.check5;
				//console.log(unique);
				if (unique=="on")
					temp="Yes";
				else
					temp="No";
				var as = "name"+"." + x.toString();
				var upda = "name"+".iPos"
				var indexof = x*tempcount+(index);
				console.log("IMPORTANT INFORMATION");
				var task1={"iPos":temp,"icount":indexof,"eTimes":result[0].first[indexof].eTimes,"eDates":result[0].first[indexof].eDates}
				console.log(task1);
				collection.update(new mongodb.ObjectId(taski),{"first.icount":indexof},{$set:{"first.$.iPos":temp}});
				//collection.update(new mongodb.ObjectId(taski),{$push:{"first":task1}});
				console.log("THIS WAS UPDATED" + temp);
				
			}

			res.redirect("/Notification");
			}
			else
			{
				res.redirect("/Notification");
			}
			db.close();	
			});
			
		}
});
});

router.post('/cEvent', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb';
	MongoClient.connect(url, function(err, db){ // Connect to the server
		if (err) {
			console.log('Unable to connect to the Server:', err);
		} else {
			console.log('Connected to Server');
			var collection = db.collection('Events'); // Get the documents collection
			var date1
			var invitees = [];
			var dates = [];
			var times = [];
			var timey=[];
			var count=0;
			var tempcount=0;
			if (!(req.body.i1.trim()=="" || req.body.i1.trim()==null))
				{
					tempcount++;
					invitees.push({"iName":req.body.i1,"iPos":"Unknown"});}
			if (!(req.body.i2.trim()=="" || req.body.i2.trim()==null))
				{tempcount++;
					invitees.push({"iName":req.body.i2,"iPos":"Unknown"});}			
			if (!(req.body.i3.trim()=="" || req.body.i3.trim()==null))
				{tempcount++;
					invitees.push({"iName":req.body.i3,"iPos":"Unknown"});}
			if (!(req.body.i4.trim()=="" || req.body.i4.trim()==null))
				{tempcount++;
					invitees.push({"iName":req.body.i4,"iPos":"Unknown"});}
			if (!(req.body.i5.trim()=="" || req.body.i5.trim()==null))
				{tempcount++;
					invitees.push({"iName":req.body.i5,"iPos":"Unknown"});}
			{
		    if (!(req.body.date1=="" || req.body.date1==null || req.body.time1=="" || req.body.time1==null)){
		    	dates.push({"eDates":req.body.date1,"eTimes":req.body.time1});
		    	for(var x=0;x<tempcount;x++)
		    	{
		    	timey.push({"eDates":req.body.date1,"eTimes":req.body.time1,"iPos":"Unknown","icount":count});
		    	count++;
		    	}
		    }
		    if (!(req.body.date2=="" || req.body.date2==null || req.body.time2=="" || req.body.time2==null)){
		    	dates.push({"eDates":req.body.date2,"eTimes":req.body.time2});
		    	for(var x=0;x<tempcount;x++){
		    	timey.push({"eDates":req.body.date2,"eTimes":req.body.time2,"iPos":"Unknown","icount":count});
		    	count++;
		    }
		    }
		    if (!(req.body.date3=="" || req.body.date3==null || req.body.time3=="" || req.body.time3==null)){
		    	dates.push({"eDates":req.body.date3,"eTimes":req.body.time3});
		    	for(var x=0;x<tempcount;x++)
		    	{
		    	timey.push({"eDates":req.body.date3,"eTimes":req.body.time3,"iPos":"Unknown","icount":count});
		    	count++;
		    }
		    }
		    if (!(req.body.date4=="" || req.body.date4==null || req.body.time4=="" || req.body.time4==null)){
		    	dates.push({"eDates":req.body.date4,"eTimes":req.body.time4});
		    	for(var x=0;x<tempcount;x++)
		    	{
		    	timey.push({"eDates":req.body.date4,"eTimes":req.body.time4,"iPos":"Unknown","icount":count});
		    	count++;
		    }
		    }
		    if (!(req.body.date5=="" || req.body.date5==null || req.body.time5=="" || req.body.time5==null)){
		    	dates.push({"eDates":req.body.date5,"eTimes":req.body.time5});
		    	for(var x=0;x<tempcount;x++)
		    	{
		    	timey.push({"eDates":req.body.date5,"eTimes":req.body.time5,"iPos":"Unknown","icount":count});
		    	count++;
		    	}
		    }
			var event1 = {
				eName:req.body.name,
				eLength:req.body.length,
				Invitees:invitees,
				eDay:dates,
				eBy: req.session.username,
				first:timey,
				"count":count,
				"tempcount":tempcount,
				"bDate":"null",
				"bTime":"null",
				"past":false
			};
			}


			collection.insert([event1], function (err, result){
				if (err) {
					res.send(err)
				}
				else {
					res.redirect("Notification");
				}
				db.close();
			});
		}
}); });


router.post('/edituser', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/preeventdb';
	MongoClient.connect(url, function(err, db){ // Connect to the server
		if (err) {
				console.log('Unable to connect to the Server:', err);
		} else {
			console.log('Connected to Server');
			var collection = db.collection('Users'); // Get the documents collection
			var email = req.session.username;
			var firstname=req.body.firstname;
			var lastname=req.body.lastname;
			var age=req.body.age;
			collection.update({Email:email}, {$set: {fName:firstname,lName:lastname,Age:age}});
		    db.close();
		    res.redirect("Notification");
		}
	}); 
});


module.exports = router;