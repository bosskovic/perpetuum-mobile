---
slug:       "angularjs-directives"
title:      angularJS directives
excerpt:    notes
category:   tech_notes
parent_category: tech
tags:
  - ttn-angularjs
  - ttn-front-end
---

pseudo code:

<pre>var myModule = angular.module(...);

myModule.directive('namespaceDirectiveName', function factory(injectables) {
  var directiveDefinitionObject = {
    restrict: string,
    priority: number,
    template: string,
    templateUrl: string,
    replace: bool,
    transclude: bool,
    scope: bool or object,
    controller: function controllerConstructor($scope,
                                               $element,
                                               $attrs,
                                               $transclude),
    require: string,
    link: function postLink(scope, iElement, iAttrs) { ... },
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
    }
  };
  return directiveDefinitionObject;
});
</pre>

<table>
<tbody>
<tr>
<td>**Property**</td>
<td>**Purpose**</td>
</tr>
<tr>
<td>restrict</td>
<td>Declare how directive can be used in a template as an element, attribute, class, comment, or any combination.</td>
</tr>
<tr>
<td>priority</td>
<td>Set the order of execution in the template relative to other directives on the element.</td>
</tr>
<tr>
<td>template</td>
<td>Specify an inline template as a string. Not used if you’re specifying your template as a URL.</td>
</tr>
<tr>
<td>templateUrl</td>
<td>Specify the template to be loaded by URL. This is not used if you’ve specified an inline template as a string.</td>
</tr>
<tr>
<td>replace</td>
<td>If true, replace the current element. If false or unspecified, append this directive to the current element.</td>
</tr>
<tr>
<td>transclude</td>
<td>Lets you move the original children of a directive to a location inside the new template.</td>
</tr>
<tr>
<td>scope</td>
<td>Create a new scope for this directive rather than inheriting the parent scope.</td>
</tr>
<tr>
<td>controller</td>
<td>Create a controller which publishes an API for communicating across directives.</td>
</tr>
<tr>
<td>require</td>
<td>Require that another directive be present for this directive to function correctly.</td>
</tr>
<tr>
<td>link</td>
<td>Programmatically modify resulting DOM element instances, add event listeners, and set up data binding.</td>
</tr>
<tr>
<td>compile</td>
<td>Programmatically modify the DOM template for features across copies of a directive, as when used in ng-repeat. Your compile function can also return link functions to modify the resulting element instances.</td>
</tr>
</tbody>
</table>


#### Resources

- Oreilly ANgularJS - Chapter 6: Directives

