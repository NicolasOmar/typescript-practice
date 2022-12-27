(()=>{"use strict";class e{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"beforebegin":"afterbegin",this.element)}}var t;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(t||(t={}));class n{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.people=r,this.status=s}}class r{constructor(){this.listeners=[]}addListener(e){this.listeners=[...this.listeners,e]}}class s extends r{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new s),this.instance}addProject(e,r,s){const i=new n(Math.random().toString(),e,r,s,t.Active);this.projects=[...this.projects,i],this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!==t&&(n.status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e([...this.projects])}}const i=s.getInstance();function l(e,t,n){const r=n.value;return{configurable:!0,enumerable:!1,get(){return r.bind(this)}}}function o(e){let t=!0;return e.required&&(t=t&&0!=e.value.toLocaleString().trim().length),null!=e.minLenght&&"string"==typeof e.value&&(t=t&&e.value.length>e.minLenght),null!=e.maxLenght&&"string"==typeof e.value&&(t=t&&e.value.length<e.maxLenght),null!=e.min&&"number"==typeof e.value&&(t=t&&e.value>e.min),null!=e.max&&"number"==typeof e.value&&(t=t&&e.value<e.max),t}class a extends e{constructor(){super("project-input","app",!0,"user-input"),this.templateElement=document.getElementById("project-input"),this.hostElement=document.getElementById("app"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.peopleInputElement=this.element.querySelector("#people"),this.configure()}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();Array.isArray(t)&&(i.addProject(...t),this.clearInputs())}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}gatherUserInput(){const e=this.titleInputElement.value,t=this.descriptionInputElement.value,n=this.peopleInputElement.value,r={value:t,required:!0},s={value:n,required:!0,min:0};if(o({value:e,required:!0})&&o(r)&&o(s))return[e,t,+n];alert("Invalid inputs, please try again")}clearInputs(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.peopleInputElement.value=""}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([l],a.prototype,"submitHandler",null);var c=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class d extends e{get persons(){const e=this.project.people;return`${e} ${1===e?"person":"persons"}`}constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragleave",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=`${this.persons} assigned`,this.element.querySelector("p").textContent=this.project.description}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){}}c([l],d.prototype,"dragStartHandler",null),c([l],d.prototype,"dragEndHandler",null);var p=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class u extends e{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),this.element.addEventListener("drop",this.dropHandler),i.addListener((e=>{this.assignedProjects=e.filter((e=>"active"===this.type?e.status===t.Active:e.status===t.Finished)),this.renderProjects()}))}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const n=e.dataTransfer.getData("text/plain");i.moveProject(n,"active"===this.type?t.Active:t.Finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}renderContent(){this.element.querySelector("ul").id=`${this.type}-projects-list`,this.element.querySelector("h2").textContent=`${this.type.toLocaleUpperCase()} PROJECTS`}renderProjects(){document.getElementById(`${this.type}-projects-list`).innerHTML="";for(const e of this.assignedProjects)new d(this.element.querySelector("ul").id,e)}}p([l],u.prototype,"dragOverHandler",null),p([l],u.prototype,"dropHandler",null),p([l],u.prototype,"dragLeaveHandler",null),new a,new u("active"),new u("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF5QixXQUFkckMsS0FBSytHLEtBQW9CakcsRUFBY29CLE9BQVNwQixFQUFjdUcsU0FDNUcsQ0FDQUgsaUJBQWlCdEUsR0FDSTVDLEtBQUtRLFFBQVEwRCxjQUFjLE1BQ25Dc0QsVUFBVUcsT0FBTyxZQUM5QixDQUNBNUMsZ0JBQ0kvRSxLQUFLUSxRQUFRMEQsY0FBYyxNQUFNeEQsR0FBSyxHQUFHVixLQUFLK0cscUJBQzlDL0csS0FBS1EsUUFBUTBELGNBQWMsTUFBTXdDLFlBQWMsR0FBRzFHLEtBQUsrRyxLQUFLYSw4QkFDaEUsQ0FDQU4saUJBQ3FCcEgsU0FBU0MsZUFBZSxHQUFHSCxLQUFLK0csc0JBQ3hDYyxVQUFZLEdBQ3JCLElBQUssTUFBTUMsS0FBZTlILEtBQUtnSCxpQkFDM0IsSUFBSWIsRUFBWW5HLEtBQUtRLFFBQVEwRCxjQUFjLE1BQU14RCxHQUFJb0gsRUFFN0QsRUFFSixFQUFXLENBQ1BuRixHQUNEbUUsRUFBWVosVUFBVyxrQkFBbUIsTUFDN0MsRUFBVyxDQUNQdkQsR0FDRG1FLEVBQVlaLFVBQVcsY0FBZSxNQUN6QyxFQUFXLENBQ1B2RCxHQUNEbUUsRUFBWVosVUFBVyxtQkFBb0IsTUNqRTlDLElBQUlsQyxFQUNKLElBQUk4QyxFQUFZLFVBQ2hCLElBQUlBLEVBQVksVyIsInNvdXJjZXMiOlsid2VicGFjazovLzUtZHJhZy1hbmQtZHJvcC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovLzUtZHJhZy1hbmQtZHJvcC8uL3NyYy9tb2RlbHMvbW9kZWxzLnRzIiwid2VicGFjazovLzUtZHJhZy1hbmQtZHJvcC8uL3NyYy9zdGF0ZS9wcm9qZWN0LXN0YXRlLnRzIiwid2VicGFjazovLzUtZHJhZy1hbmQtZHJvcC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzIiwid2VicGFjazovLzUtZHJhZy1hbmQtZHJvcC8uL3NyYy91dGlscy92YWxpZGF0aW9uLnRzIiwid2VicGFjazovLzUtZHJhZy1hbmQtZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vNS1kcmFnLWFuZC1kcm9wLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovLzUtZHJhZy1hbmQtZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly81LWRyYWctYW5kLWRyb3AvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IodGVtcGxhdGVJZCwgaG9zdEVsZW1lbnRJZCwgaW5zZXJ0QXRTdGFydCwgbmV3RWxlbWVudElkKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKTtcclxuICAgICAgICB0aGlzLmhvc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJZCk7XHJcbiAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LCB0cnVlKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgbmV3RWxlbWVudElkICYmICh0aGlzLmVsZW1lbnQuaWQgPSBuZXdFbGVtZW50SWQpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoKGluc2VydEF0U3RhcnQpO1xyXG4gICAgfVxyXG4gICAgYXR0YWNoKGluc2VydEF0QmVnaW5uaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoaW5zZXJ0QXRCZWdpbm5pbmcgPyAnYmVmb3JlYmVnaW4nIDogJ2FmdGVyYmVnaW4nLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCB2YXIgUHJvamVjdFN0YXR1cztcclxuKGZ1bmN0aW9uIChQcm9qZWN0U3RhdHVzKSB7XHJcbiAgICBQcm9qZWN0U3RhdHVzW1Byb2plY3RTdGF0dXNbXCJBY3RpdmVcIl0gPSAwXSA9IFwiQWN0aXZlXCI7XHJcbiAgICBQcm9qZWN0U3RhdHVzW1Byb2plY3RTdGF0dXNbXCJGaW5pc2hlZFwiXSA9IDFdID0gXCJGaW5pc2hlZFwiO1xyXG59KShQcm9qZWN0U3RhdHVzIHx8IChQcm9qZWN0U3RhdHVzID0ge30pKTtcclxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlLCBzdGF0dXMpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLnBlb3BsZSA9IHBlb3BsZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9tb2RlbHNcIjtcclxuY2xhc3MgU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcclxuICAgIH1cclxuICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyRm4pIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFsuLi50aGlzLmxpc3RlbmVycywgbGlzdGVuZXJGbl07XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBhZGRQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGUsIFByb2plY3RTdGF0dXMuQWN0aXZlKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gWy4uLnRoaXMucHJvamVjdHMsIG5ld1Byb2plY3RdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgICBtb3ZlUHJvamVjdChwcm9qZWN0SWQsIG5ld1N0YXR1cykge1xyXG4gICAgICAgIGNvbnN0IF9wcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKF9wcm9qZWN0ID0+IF9wcm9qZWN0LmlkID09PSBwcm9qZWN0SWQpO1xyXG4gICAgICAgIGlmIChfcHJvamVjdCAmJiBfcHJvamVjdC5zdGF0dXMgIT09IG5ld1N0YXR1cykge1xyXG4gICAgICAgICAgICBfcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBsaXN0ZW5lckZuKFsuLi50aGlzLnByb2plY3RzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBnbG9iYWxQcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIEF1dG9CaW5kKF8sIF9fLCBkZXNjcmlwdG9yKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgICBjb25zdCBjdXN0b21EZXNjcmlwdG9yID0ge1xyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gY3VzdG9tRGVzY3JpcHRvcjtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUodmFsaWRhdGFibGVJbnB1dCkge1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ2h0ICE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS5sZW5ndGggPiB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmdodDtcclxuICAgIH1cclxuICAgIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1heExlbmdodCAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoIDwgdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5naHQ7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsaWRhdGFibGVJbnB1dC5taW4gIT0gbnVsbCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID4gdmFsaWRhdGFibGVJbnB1dC5taW47XHJcbiAgICB9XHJcbiAgICBpZiAodmFsaWRhdGFibGVJbnB1dC5tYXggIT0gbnVsbCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlIDwgdmFsaWRhdGFibGVJbnB1dC5tYXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG4iLCJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBnbG9iYWxQcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBBdXRvQmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XHJcbmltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3ZhbGlkYXRpb25cIjtcclxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigncHJvamVjdC1pbnB1dCcsICdhcHAnLCB0cnVlLCAndXNlci1pbnB1dCcpO1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaW5wdXQnKTtcclxuICAgICAgICB0aGlzLmhvc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xyXG4gICAgICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcclxuICAgICAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjcGVvcGxlJyk7XHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIH1cclxuICAgIHN1Ym1pdEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbnB1dHMgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dHMpKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbFByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KC4uLnVzZXJJbnB1dHMpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uZmlndXJlKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQ29udGVudCgpIHsgfVxyXG4gICAgZ2F0aGVyVXNlcklucHV0KCkge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGVvcGxlID0gdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdGl0bGVWYWxpZGF0b3IgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aXRsZSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsaWRhdG9yID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBwZW9wbGVWYWxpZGF0b3IgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwZW9wbGUsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh2YWxpZGF0ZSh0aXRsZVZhbGlkYXRvcikgJiZcclxuICAgICAgICAgICAgdmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0b3IpICYmXHJcbiAgICAgICAgICAgIHZhbGlkYXRlKHBlb3BsZVZhbGlkYXRvcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0aXRsZSwgZGVzY3JpcHRpb24sICtwZW9wbGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgaW5wdXRzLCBwbGVhc2UgdHJ5IGFnYWluJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXJJbnB1dHMoKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgfVxyXG59XHJcbl9fZGVjb3JhdGUoW1xyXG4gICAgQXV0b0JpbmRcclxuXSwgUHJvamVjdElucHV0LnByb3RvdHlwZSwgXCJzdWJtaXRIYW5kbGVyXCIsIG51bGwpO1xyXG4iLCJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBdXRvQmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SXRlbSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBnZXQgcGVyc29ucygpIHtcclxuICAgICAgICBjb25zdCBfcGVvcGxlID0gdGhpcy5wcm9qZWN0LnBlb3BsZTtcclxuICAgICAgICByZXR1cm4gYCR7X3Blb3BsZX0gJHtfcGVvcGxlID09PSAxID8gJ3BlcnNvbicgOiAncGVyc29ucyd9YDtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGhvc3RJZCwgX3Byb2plY3QpIHtcclxuICAgICAgICBzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsIGZhbHNlLCBfcHJvamVjdC5pZCk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gX3Byb2plY3Q7XHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICAgIH1cclxuICAgIGNvbmZpZ3VyZSgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnRW5kSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMycpLnRleHRDb250ZW50ID0gYCR7dGhpcy5wZXJzb25zfSBhc3NpZ25lZGA7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMucHJvamVjdC5pZCk7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcbiAgICB9XHJcbiAgICBkcmFnRW5kSGFuZGxlcihfKSB7IH1cclxufVxyXG5fX2RlY29yYXRlKFtcclxuICAgIEF1dG9CaW5kXHJcbl0sIFByb2plY3RJdGVtLnByb3RvdHlwZSwgXCJkcmFnU3RhcnRIYW5kbGVyXCIsIG51bGwpO1xyXG5fX2RlY29yYXRlKFtcclxuICAgIEF1dG9CaW5kXHJcbl0sIFByb2plY3RJdGVtLnByb3RvdHlwZSwgXCJkcmFnRW5kSGFuZGxlclwiLCBudWxsKTtcclxuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tIFwiLi9wcm9qZWN0LWl0ZW1cIjtcclxuaW1wb3J0IHsgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvbW9kZWxzXCI7XHJcbmltcG9ydCB7IGdsb2JhbFByb2plY3RTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlXCI7XHJcbmltcG9ydCB7IEF1dG9CaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcclxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGUpIHtcclxuICAgICAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICAgIH1cclxuICAgIGNvbmZpZ3VyZSgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3BIYW5kbGVyKTtcclxuICAgICAgICBnbG9iYWxQcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcihfcHJvamVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50eXBlID09PSAnYWN0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gX3Byb2plY3Quc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgIDogX3Byb2plY3Quc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09ICd0ZXh0L3BsYWluJykge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0RWxlbSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xyXG4gICAgICAgICAgICBsaXN0RWxlbS5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcm9wSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RJZCA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XHJcbiAgICAgICAgZ2xvYmFsUHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KHByb2plY3RJZCwgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZCk7XHJcbiAgICB9XHJcbiAgICBkcmFnTGVhdmVIYW5kbGVyKF8pIHtcclxuICAgICAgICBjb25zdCBsaXN0RWxlbSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xyXG4gICAgICAgIGxpc3RFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKS5pZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGA7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykudGV4dENvbnRlbnQgPSBgJHt0aGlzLnR5cGUudG9Mb2NhbGVVcHBlckNhc2UoKX0gUFJPSkVDVFNgO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgKTtcclxuICAgICAgICBsaXN0RWxlbS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBmb3IgKGNvbnN0IHByb2plY3RJdGVtIG9mIHRoaXMuYXNzaWduZWRQcm9qZWN0cykge1xyXG4gICAgICAgICAgICBuZXcgUHJvamVjdEl0ZW0odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykuaWQsIHByb2plY3RJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuX19kZWNvcmF0ZShbXHJcbiAgICBBdXRvQmluZFxyXG5dLCBQcm9qZWN0TGlzdC5wcm90b3R5cGUsIFwiZHJhZ092ZXJIYW5kbGVyXCIsIG51bGwpO1xyXG5fX2RlY29yYXRlKFtcclxuICAgIEF1dG9CaW5kXHJcbl0sIFByb2plY3RMaXN0LnByb3RvdHlwZSwgXCJkcm9wSGFuZGxlclwiLCBudWxsKTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICBBdXRvQmluZFxyXG5dLCBQcm9qZWN0TGlzdC5wcm90b3R5cGUsIFwiZHJhZ0xlYXZlSGFuZGxlclwiLCBudWxsKTtcclxuIiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0XCI7XHJcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3RcIjtcclxubmV3IFByb2plY3RJbnB1dCgpO1xyXG5uZXcgUHJvamVjdExpc3QoJ2FjdGl2ZScpO1xyXG5uZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJyk7XHJcbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInRlbXBsYXRlSWQiLCJob3N0RWxlbWVudElkIiwiaW5zZXJ0QXRTdGFydCIsIm5ld0VsZW1lbnRJZCIsInRoaXMiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaG9zdEVsZW1lbnQiLCJpbXBvcnRlZE5vZGUiLCJpbXBvcnROb2RlIiwiY29udGVudCIsImVsZW1lbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImlkIiwiYXR0YWNoIiwiaW5zZXJ0QXRCZWdpbm5pbmciLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJQcm9qZWN0U3RhdHVzIiwiUHJvamVjdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwZW9wbGUiLCJzdGF0dXMiLCJTdGF0ZSIsImxpc3RlbmVycyIsImFkZExpc3RlbmVyIiwibGlzdGVuZXJGbiIsIlByb2plY3RTdGF0ZSIsInN1cGVyIiwicHJvamVjdHMiLCJzdGF0aWMiLCJpbnN0YW5jZSIsImFkZFByb2plY3QiLCJuZXdQcm9qZWN0IiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwiQWN0aXZlIiwidXBkYXRlTGlzdGVuZXJzIiwibW92ZVByb2plY3QiLCJwcm9qZWN0SWQiLCJuZXdTdGF0dXMiLCJfcHJvamVjdCIsImZpbmQiLCJnbG9iYWxQcm9qZWN0U3RhdGUiLCJnZXRJbnN0YW5jZSIsIkF1dG9CaW5kIiwiXyIsIl9fIiwiZGVzY3JpcHRvciIsIm9yaWdpbmFsTWV0aG9kIiwidmFsdWUiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiYmluZCIsInZhbGlkYXRlIiwidmFsaWRhdGFibGVJbnB1dCIsImlzVmFsaWQiLCJyZXF1aXJlZCIsInRvTG9jYWxlU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsIm1pbkxlbmdodCIsIm1heExlbmdodCIsIm1pbiIsIm1heCIsIlByb2plY3RJbnB1dCIsInRpdGxlSW5wdXRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImRlc2NyaXB0aW9uSW5wdXRFbGVtZW50IiwicGVvcGxlSW5wdXRFbGVtZW50IiwiY29uZmlndXJlIiwic3VibWl0SGFuZGxlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1c2VySW5wdXRzIiwiZ2F0aGVyVXNlcklucHV0IiwiQXJyYXkiLCJpc0FycmF5IiwiY2xlYXJJbnB1dHMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVuZGVyQ29udGVudCIsImRlc2NyaXB0aW9uVmFsaWRhdG9yIiwicGVvcGxlVmFsaWRhdG9yIiwiYWxlcnQiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImQiLCJjIiwiYXJndW1lbnRzIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fZGVjb3JhdGUiLCJwcm90b3R5cGUiLCJQcm9qZWN0SXRlbSIsInBlcnNvbnMiLCJfcGVvcGxlIiwicHJvamVjdCIsImhvc3RJZCIsImRyYWdTdGFydEhhbmRsZXIiLCJkcmFnRW5kSGFuZGxlciIsInRleHRDb250ZW50IiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImVmZmVjdEFsbG93ZWQiLCJQcm9qZWN0TGlzdCIsInR5cGUiLCJhc3NpZ25lZFByb2plY3RzIiwiZHJhZ092ZXJIYW5kbGVyIiwiZHJhZ0xlYXZlSGFuZGxlciIsImRyb3BIYW5kbGVyIiwiZmlsdGVyIiwiRmluaXNoZWQiLCJyZW5kZXJQcm9qZWN0cyIsInR5cGVzIiwiY2xhc3NMaXN0IiwiYWRkIiwiZ2V0RGF0YSIsInJlbW92ZSIsInRvTG9jYWxlVXBwZXJDYXNlIiwiaW5uZXJIVE1MIiwicHJvamVjdEl0ZW0iXSwic291cmNlUm9vdCI6IiJ9