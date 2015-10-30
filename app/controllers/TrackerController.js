
var trackerService = require('../services/TrackerService');

var trackerController = {};

trackerController.createProject =  function(project){
  trackerService.createProject(project);
}

trackerController.listAllProject =  function(req,res){
  trackerService.listAllProject(req,res);
}
trackerController.listAllLocations =  function(req,res){
  trackerService.listAllLocations(req,res);
}
trackerController.listAllLocationsByProject =  function(req,res){
  trackerService.listAllLocationsByProject(req,res);
}
trackerController.listAllLocationsFilterByProject =  function(req,res){
  trackerService.listAllLocationsFilterByProject(req,res);
}
trackerController.listAllProjectsByLocation =  function(req,res){
  trackerService.listAllProjectsByLocation(req,res);
}
trackerController.getProjectDetailsByLocation =  function(req,res){
  trackerService.getProjectDetailsByLocation(req,res);
}
trackerController.updateMasterData =  function(master){
  trackerService.updateMasterData(master);
}


trackerController.inviteProperty =  function(req,res, data){
  trackerService.inviteProperty(req,res, data);

}

module.exports = trackerController;
