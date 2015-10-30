
var ProjectModel = require('../models/project');
var LocationModel = require('../models/location');

var MasterModel = require('../models/master');

var trackerService = {};

trackerService.createProject =  function(project){
  var projectObj  =  new ProjectModel(project);
  projectObj.save(function(err){
      return err;
  });
}

trackerService.listAllProject =  function(req,res){
  ProjectModel.find({}, function(err,projects){
    res.json(projects);
  });
}

trackerService.listAllLocations =  function(req,res){
  LocationModel.find({}, function(err,locations){
    res.json(locations);
  });
}

trackerService.listAllLocationsByProject =  function(req,res){
  LocationModel.find({}, function(err,locations){
    var finalLocations = [];
    var projectLocations = [];
    var currentProjectId = req.params.id;
    MasterModel.find({"projectId":currentProjectId}, function(err,masters){
      if(masters && masters.length>0){
        masters.map(function(eachMaster){
            projectLocations.push(eachMaster.locationId);
        });
        locations.map(function(eachLocation){
            if(projectLocations.indexOf(eachLocation._id.toString()) == -1){
              finalLocations.push(eachLocation);
            }
        });
        res.json(finalLocations);
      }
      else{
        res.json(locations);
      }

    });

  });
}
trackerService.listAllLocationsFilterByProject =  function(req,res){
  LocationModel.find({}, function(err,locations){
    var finalLocations = [];
    var projectLocations = [];
    var currentProjectId = req.params.id;
    MasterModel.find({"projectId":currentProjectId}, function(err,masters){
      if(masters && masters.length>0){
        masters.map(function(eachMaster){
            projectLocations.push(eachMaster.locationId);
        });
        locations.map(function(eachLocation){
            if(projectLocations.indexOf(eachLocation._id.toString()) > -1){
              finalLocations.push(eachLocation);
            }
        });
        res.json(finalLocations);
      }
      else{
        res.json(finalLocations);
      }
    });

  });
}

trackerService.inviteProperty =  function(req,res, data){
  ProjectModel.findById(data.projectId,function(err, project){
    data.locations.map(function(eachLoc){
      var ipData = {
        "invitedBy" : req.decoded.email,
        "projectId" : data.projectId,
        "locationId" : eachLoc._id,
        "data" : project.templateData,
        "invitedBy" : req.decoded.email,
        "createDate" : new Date()
      };
      var masterObj  =  new MasterModel(ipData);
      masterObj.save(function(err){
        //console.log(err);
      });
    });
  });
  res.json({success:true});

}

trackerService.listAllProjectsByLocation =  function(req,res){
  var locationId = req.params.id;
  MasterModel.find({"locationId":locationId}, function(err,masters){
    //get all master docs
    //calculate revenue if need -  TODO
    var projectIds = [];
    masters.map(function(eachMaster){
        projectIds.push(eachMaster.projectId);
    });
    //get projects doc from ProjectModel
    ProjectModel.find({_id:{$in:projectIds}}, function(err,projects){
      res.json(projects);
    });

  });

}
trackerService.getProjectDetailsByLocation =  function(req,res){
  var projectId = req.params.projectId;
  var locationId = req.params.locationId;
  //get project details
  ProjectModel.findById(projectId, function(err, project){
    MasterModel.findOne({"locationId":locationId, "projectId": projectId}, function(err,master){
        LocationModel.findById(locationId,function(err, location){
          res.json({
              projectDetails: project,
              masterDetails:master,
              locationDetails : location
          });
        });
    });
  });
}

trackerService.updateMasterData =  function(master){
  MasterModel.findById(master._id,function(err, masterFromDb){
      masterFromDb.data = master.data;
      masterFromDb.save(function(err){
          return err;
      });

  });
}


module.exports = trackerService;
