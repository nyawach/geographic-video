angular.module("todo",["ionic"]).factory("Projects",function(){return{all:function(){var projectString=window.localStorage.projects;return projectString?angular.fromJson(projectString):[]},save:function(projects){window.localStorage.projects=angular.toJson(projects)},newProject:function(projectTitle){return{title:projectTitle,tasks:[]}},getLastActiveIndex:function(){return parseInt(window.localStorage.lastActiveProject)||0},setLastActiveIndex:function(index){window.localStorage.lastActiveProject=index}}}).controller("TodoCtrl",["$scope","$timeout","$ionicModal","Projects","$ionicSideMenuDelegate",function($scope,$timeout,$ionicModal,Projects,$ionicSideMenuDelegate){var createProject=function(projectTitle){var newProject=Projects.newProject(projectTitle);$scope.projects.push(newProject),Projects.save($scope.projects),$scope.selectProject(newProject,$scope.projects.length-1)};$scope.projects=Projects.all(),$scope.activeProject=$scope.projects[Projects.getLastActiveIndex()],$scope.newProject=function(){var projectTitle=prompt("Project name");projectTitle&&createProject(projectTitle)},$scope.selectProject=function(project,index){$scope.activeProject=project,Projects.setLastActiveIndex(index),$ionicSideMenuDelegate.toggleLeft(!1)},$ionicModal.fromTemplateUrl("new-task.html",function(modal){$scope.taskModal=modal},{scope:$scope}),$scope.createTask=function(task){$scope.activeProject&&task&&($scope.activeProject.tasks.push({title:task.title}),$scope.taskModal.hide(),Projects.save($scope.projects),task.title="")},$scope.newTask=function(){$scope.taskModal.show()},$scope.closeNewTask=function(){$scope.taskModal.hide()},$scope.toggleProjects=function(){$ionicSideMenuDelegate.toggleLeft()},$timeout(function(){if(0==$scope.projects.length)for(;;){var projectTitle=prompt("Your first project title:");if(projectTitle){createProject(projectTitle);break}}})}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiZmFjdG9yeSIsImFsbCIsInByb2plY3RTdHJpbmciLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJmcm9tSnNvbiIsInNhdmUiLCJwcm9qZWN0cyIsInRvSnNvbiIsIm5ld1Byb2plY3QiLCJwcm9qZWN0VGl0bGUiLCJ0aXRsZSIsInRhc2tzIiwiZ2V0TGFzdEFjdGl2ZUluZGV4IiwicGFyc2VJbnQiLCJzZXRMYXN0QWN0aXZlSW5kZXgiLCJpbmRleCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkdGltZW91dCIsIiRpb25pY01vZGFsIiwiUHJvamVjdHMiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwiY3JlYXRlUHJvamVjdCIsInB1c2giLCJzZWxlY3RQcm9qZWN0IiwibGVuZ3RoIiwiYWN0aXZlUHJvamVjdCIsInByb21wdCIsInByb2plY3QiLCJ0b2dnbGVMZWZ0IiwiZnJvbVRlbXBsYXRlVXJsIiwibW9kYWwiLCJ0YXNrTW9kYWwiLCJzY29wZSIsImNyZWF0ZVRhc2siLCJ0YXNrIiwiaGlkZSIsIm5ld1Rhc2siLCJzaG93IiwiY2xvc2VOZXdUYXNrIiwidG9nZ2xlUHJvamVjdHMiXSwibWFwcGluZ3MiOiJBQUFBQSxRQUFBQyxPQUFBLFFBQUEsVUFNQUMsUUFBQSxXQUFBLFdBQ0EsT0FDQUMsSUFBQSxXQUNBLEdBQUFDLGVBQUFDLE9BQUFDLGFBQUEsUUFDQSxPQUFBRixlQUNBSixRQUFBTyxTQUFBSCxtQkFJQUksS0FBQSxTQUFBQyxVQUNBSixPQUFBQyxhQUFBLFNBQUFOLFFBQUFVLE9BQUFELFdBRUFFLFdBQUEsU0FBQUMsY0FFQSxPQUNBQyxNQUFBRCxhQUNBRSxXQUdBQyxtQkFBQSxXQUNBLE1BQUFDLFVBQUFYLE9BQUFDLGFBQUEsb0JBQUEsR0FFQVcsbUJBQUEsU0FBQUMsT0FDQWIsT0FBQUMsYUFBQSxrQkFBQVksVUFLQUMsV0FBQSxZQUFBLFNBQUEsV0FBQSxjQUFBLFdBQUEseUJBQUEsU0FBQUMsT0FBQUMsU0FBQUMsWUFBQUMsU0FBQUMsd0JBSUEsR0FBQUMsZUFBQSxTQUFBYixjQUNBLEdBQUFELFlBQUFZLFNBQUFaLFdBQUFDLGFBQ0FRLFFBQUFYLFNBQUFpQixLQUFBZixZQUNBWSxTQUFBZixLQUFBWSxPQUFBWCxVQUNBVyxPQUFBTyxjQUFBaEIsV0FBQVMsT0FBQVgsU0FBQW1CLE9BQUEsR0FLQVIsUUFBQVgsU0FBQWMsU0FBQXBCLE1BR0FpQixPQUFBUyxjQUFBVCxPQUFBWCxTQUFBYyxTQUFBUixzQkFHQUssT0FBQVQsV0FBQSxXQUNBLEdBQUFDLGNBQUFrQixPQUFBLGVBQ0FsQixlQUNBYSxjQUFBYixlQUtBUSxPQUFBTyxjQUFBLFNBQUFJLFFBQUFiLE9BQ0FFLE9BQUFTLGNBQUFFLFFBQ0FSLFNBQUFOLG1CQUFBQyxPQUNBTSx1QkFBQVEsWUFBQSxJQUlBVixZQUFBVyxnQkFBQSxnQkFBQSxTQUFBQyxPQUNBZCxPQUFBZSxVQUFBRCxRQUVBRSxNQUFBaEIsU0FHQUEsT0FBQWlCLFdBQUEsU0FBQUMsTUFDQWxCLE9BQUFTLGVBQUFTLE9BR0FsQixPQUFBUyxjQUFBZixNQUFBWSxNQUNBYixNQUFBeUIsS0FBQXpCLFFBRUFPLE9BQUFlLFVBQUFJLE9BR0FoQixTQUFBZixLQUFBWSxPQUFBWCxVQUVBNkIsS0FBQXpCLE1BQUEsS0FHQU8sT0FBQW9CLFFBQUEsV0FDQXBCLE9BQUFlLFVBQUFNLFFBR0FyQixPQUFBc0IsYUFBQSxXQUNBdEIsT0FBQWUsVUFBQUksUUFHQW5CLE9BQUF1QixlQUFBLFdBQ0FuQix1QkFBQVEsY0FPQVgsU0FBQSxXQUNBLEdBQUEsR0FBQUQsT0FBQVgsU0FBQW1CLE9BQ0EsT0FBQSxDQUNBLEdBQUFoQixjQUFBa0IsT0FBQSw0QkFDQSxJQUFBbEIsYUFBQSxDQUNBYSxjQUFBYixhQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0b2RvJywgWydpb25pYyddKVxyXG4vKipcclxuICogVGhlIFByb2plY3RzIGZhY3RvcnkgaGFuZGxlcyBzYXZpbmcgYW5kIGxvYWRpbmcgcHJvamVjdHNcclxuICogZnJvbSBsb2NhbCBzdG9yYWdlLCBhbmQgYWxzbyBsZXRzIHVzIHNhdmUgYW5kIGxvYWQgdGhlXHJcbiAqIGxhc3QgYWN0aXZlIHByb2plY3QgaW5kZXguXHJcbiAqL1xyXG4uZmFjdG9yeSgnUHJvamVjdHMnLCBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgYWxsOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHByb2plY3RTdHJpbmcgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydwcm9qZWN0cyddO1xyXG4gICAgICBpZihwcm9qZWN0U3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZnJvbUpzb24ocHJvamVjdFN0cmluZyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSxcclxuICAgIHNhdmU6IGZ1bmN0aW9uKHByb2plY3RzKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ3Byb2plY3RzJ10gPSBhbmd1bGFyLnRvSnNvbihwcm9qZWN0cyk7XHJcbiAgICB9LFxyXG4gICAgbmV3UHJvamVjdDogZnVuY3Rpb24ocHJvamVjdFRpdGxlKSB7XHJcbiAgICAgIC8vIEFkZCBhIG5ldyBwcm9qZWN0XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGl0bGU6IHByb2plY3RUaXRsZSxcclxuICAgICAgICB0YXNrczogW11cclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBnZXRMYXN0QWN0aXZlSW5kZXg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZVsnbGFzdEFjdGl2ZVByb2plY3QnXSkgfHwgMDtcclxuICAgIH0sXHJcbiAgICBzZXRMYXN0QWN0aXZlSW5kZXg6IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2xhc3RBY3RpdmVQcm9qZWN0J10gPSBpbmRleDtcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG4uY29udHJvbGxlcignVG9kb0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0LCAkaW9uaWNNb2RhbCwgUHJvamVjdHMsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcclxuXHJcbiAgLy8gQSB1dGlsaXR5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBwcm9qZWN0XHJcbiAgLy8gd2l0aCB0aGUgZ2l2ZW4gcHJvamVjdFRpdGxlXHJcbiAgdmFyIGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0VGl0bGUpIHtcclxuICAgIHZhciBuZXdQcm9qZWN0ID0gUHJvamVjdHMubmV3UHJvamVjdChwcm9qZWN0VGl0bGUpO1xyXG4gICAgJHNjb3BlLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBQcm9qZWN0cy5zYXZlKCRzY29wZS5wcm9qZWN0cyk7XHJcbiAgICAkc2NvcGUuc2VsZWN0UHJvamVjdChuZXdQcm9qZWN0LCAkc2NvcGUucHJvamVjdHMubGVuZ3RoLTEpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIExvYWQgb3IgaW5pdGlhbGl6ZSBwcm9qZWN0c1xyXG4gICRzY29wZS5wcm9qZWN0cyA9IFByb2plY3RzLmFsbCgpO1xyXG5cclxuICAvLyBHcmFiIHRoZSBsYXN0IGFjdGl2ZSwgb3IgdGhlIGZpcnN0IHByb2plY3RcclxuICAkc2NvcGUuYWN0aXZlUHJvamVjdCA9ICRzY29wZS5wcm9qZWN0c1tQcm9qZWN0cy5nZXRMYXN0QWN0aXZlSW5kZXgoKV07XHJcblxyXG4gIC8vIENhbGxlZCB0byBjcmVhdGUgYSBuZXcgcHJvamVjdFxyXG4gICRzY29wZS5uZXdQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcHJvamVjdFRpdGxlID0gcHJvbXB0KCdQcm9qZWN0IG5hbWUnKTtcclxuICAgIGlmKHByb2plY3RUaXRsZSkge1xyXG4gICAgICBjcmVhdGVQcm9qZWN0KHByb2plY3RUaXRsZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gQ2FsbGVkIHRvIHNlbGVjdCB0aGUgZ2l2ZW4gcHJvamVjdFxyXG4gICRzY29wZS5zZWxlY3RQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdCwgaW5kZXgpIHtcclxuICAgICRzY29wZS5hY3RpdmVQcm9qZWN0ID0gcHJvamVjdDtcclxuICAgIFByb2plY3RzLnNldExhc3RBY3RpdmVJbmRleChpbmRleCk7XHJcbiAgICAkaW9uaWNTaWRlTWVudURlbGVnYXRlLnRvZ2dsZUxlZnQoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIENyZWF0ZSBvdXIgbW9kYWxcclxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ25ldy10YXNrLmh0bWwnLCBmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgJHNjb3BlLnRhc2tNb2RhbCA9IG1vZGFsO1xyXG4gIH0sIHtcclxuICAgIHNjb3BlOiAkc2NvcGVcclxuICB9KTtcclxuXHJcbiAgJHNjb3BlLmNyZWF0ZVRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICBpZighJHNjb3BlLmFjdGl2ZVByb2plY3QgfHwgIXRhc2spIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLmFjdGl2ZVByb2plY3QudGFza3MucHVzaCh7XHJcbiAgICAgIHRpdGxlOiB0YXNrLnRpdGxlXHJcbiAgICB9KTtcclxuICAgICRzY29wZS50YXNrTW9kYWwuaGlkZSgpO1xyXG5cclxuICAgIC8vIEluZWZmaWNpZW50LCBidXQgc2F2ZSBhbGwgdGhlIHByb2plY3RzXHJcbiAgICBQcm9qZWN0cy5zYXZlKCRzY29wZS5wcm9qZWN0cyk7XHJcblxyXG4gICAgdGFzay50aXRsZSA9IFwiXCI7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLm5ld1Rhc2sgPSBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS50YXNrTW9kYWwuc2hvdygpO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5jbG9zZU5ld1Rhc2sgPSBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS50YXNrTW9kYWwuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgJHNjb3BlLnRvZ2dsZVByb2plY3RzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkaW9uaWNTaWRlTWVudURlbGVnYXRlLnRvZ2dsZUxlZnQoKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gVHJ5IHRvIGNyZWF0ZSB0aGUgZmlyc3QgcHJvamVjdCwgbWFrZSBzdXJlIHRvIGRlZmVyXHJcbiAgLy8gdGhpcyBieSB1c2luZyAkdGltZW91dCBzbyBldmVyeXRoaW5nIGlzIGluaXRpYWxpemVkXHJcbiAgLy8gcHJvcGVybHlcclxuICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIGlmKCRzY29wZS5wcm9qZWN0cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICB3aGlsZSh0cnVlKSB7XHJcbiAgICAgICAgdmFyIHByb2plY3RUaXRsZSA9IHByb21wdCgnWW91ciBmaXJzdCBwcm9qZWN0IHRpdGxlOicpO1xyXG4gICAgICAgIGlmKHByb2plY3RUaXRsZSkge1xyXG4gICAgICAgICAgY3JlYXRlUHJvamVjdChwcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=