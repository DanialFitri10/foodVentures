function cov_2b8wb9rpwp(){var path="C:\\Users\\kavin\\Documents\\foodVentures\\foodVentures\\public\\js\\register.js";var hash="69706c31a2bc579b5fa47b40bdd0421525fdc621";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"C:\\Users\\kavin\\Documents\\foodVentures\\foodVentures\\public\\js\\register.js",statementMap:{"0":{start:{line:2,column:19},end:{line:2,column:21}},"1":{start:{line:3,column:19},end:{line:3,column:31}},"2":{start:{line:4,column:4},end:{line:4,column:60}},"3":{start:{line:5,column:4},end:{line:5,column:66}},"4":{start:{line:6,column:26},end:{line:6,column:74}},"5":{start:{line:7,column:4},end:{line:14,column:5}},"6":{start:{line:8,column:8},end:{line:8,column:80}},"7":{start:{line:9,column:8},end:{line:9,column:15}},"8":{start:{line:11,column:9},end:{line:14,column:5}},"9":{start:{line:12,column:8},end:{line:12,column:80}},"10":{start:{line:13,column:8},end:{line:13,column:15}},"11":{start:{line:15,column:18},end:{line:15,column:38}},"12":{start:{line:16,column:4},end:{line:16,column:44}},"13":{start:{line:17,column:4},end:{line:17,column:65}},"14":{start:{line:18,column:4},end:{line:27,column:6}},"15":{start:{line:19,column:8},end:{line:19,column:52}},"16":{start:{line:20,column:8},end:{line:20,column:29}},"17":{start:{line:21,column:8},end:{line:26,column:9}},"18":{start:{line:22,column:12},end:{line:22,column:48}},"19":{start:{line:25,column:12},end:{line:25,column:82}},"20":{start:{line:28,column:4},end:{line:28,column:43}}},fnMap:{"0":{name:"register",decl:{start:{line:1,column:9},end:{line:1,column:17}},loc:{start:{line:1,column:20},end:{line:29,column:1}},line:1},"1":{name:"(anonymous_1)",decl:{start:{line:18,column:21},end:{line:18,column:22}},loc:{start:{line:18,column:33},end:{line:27,column:5}},line:18}},branchMap:{"0":{loc:{start:{line:7,column:4},end:{line:14,column:5}},type:"if",locations:[{start:{line:7,column:4},end:{line:14,column:5}},{start:{line:7,column:4},end:{line:14,column:5}}],line:7},"1":{loc:{start:{line:7,column:8},end:{line:7,column:80}},type:"binary-expr",locations:[{start:{line:7,column:8},end:{line:7,column:28}},{start:{line:7,column:32},end:{line:7,column:55}},{start:{line:7,column:59},end:{line:7,column:80}}],line:7},"2":{loc:{start:{line:11,column:9},end:{line:14,column:5}},type:"if",locations:[{start:{line:11,column:9},end:{line:14,column:5}},{start:{line:11,column:9},end:{line:14,column:5}}],line:11},"3":{loc:{start:{line:21,column:8},end:{line:26,column:9}},type:"if",locations:[{start:{line:21,column:8},end:{line:26,column:9}},{start:{line:21,column:8},end:{line:26,column:9}}],line:21}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0},f:{"0":0,"1":0},b:{"0":[0,0],"1":[0,0,0],"2":[0,0],"3":[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"69706c31a2bc579b5fa47b40bdd0421525fdc621"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_2b8wb9rpwp=function(){return actualCoverage;};}return actualCoverage;}cov_2b8wb9rpwp();function register(){cov_2b8wb9rpwp().f[0]++;var response=(cov_2b8wb9rpwp().s[0]++,"");var jsonData=(cov_2b8wb9rpwp().s[1]++,new Object());cov_2b8wb9rpwp().s[2]++;jsonData.email=document.getElementById("email").value;cov_2b8wb9rpwp().s[3]++;jsonData.password=document.getElementById("password").value;var confirmPassword=(cov_2b8wb9rpwp().s[4]++,document.getElementById("confirmPassword").value);cov_2b8wb9rpwp().s[5]++;if((cov_2b8wb9rpwp().b[1][0]++,jsonData.email=="")||(cov_2b8wb9rpwp().b[1][1]++,jsonData.password=="")||(cov_2b8wb9rpwp().b[1][2]++,confirmPassword=="")){cov_2b8wb9rpwp().b[0][0]++;cov_2b8wb9rpwp().s[6]++;document.getElementById("error").innerHTML='All fields are required!';cov_2b8wb9rpwp().s[7]++;return;}else{cov_2b8wb9rpwp().b[0][1]++;cov_2b8wb9rpwp().s[8]++;if(jsonData.password!=confirmPassword){cov_2b8wb9rpwp().b[2][0]++;cov_2b8wb9rpwp().s[9]++;document.getElementById("error").innerHTML='Password does not match!';cov_2b8wb9rpwp().s[10]++;return;}else{cov_2b8wb9rpwp().b[2][1]++;}}var request=(cov_2b8wb9rpwp().s[11]++,new XMLHttpRequest());cov_2b8wb9rpwp().s[12]++;request.open("POST","/register",true);cov_2b8wb9rpwp().s[13]++;request.setRequestHeader('Content-Type','application/json');cov_2b8wb9rpwp().s[14]++;request.onload=function(){cov_2b8wb9rpwp().f[1]++;cov_2b8wb9rpwp().s[15]++;response=JSON.parse(request.responseText);cov_2b8wb9rpwp().s[16]++;console.log(response);cov_2b8wb9rpwp().s[17]++;if(response.message==undefined){cov_2b8wb9rpwp().b[3][0]++;cov_2b8wb9rpwp().s[18]++;window.location.href='index.html';}else{cov_2b8wb9rpwp().b[3][1]++;cov_2b8wb9rpwp().s[19]++;document.getElementById("error").innerHTML='Authentication failed!';}};cov_2b8wb9rpwp().s[20]++;request.send(JSON.stringify(jsonData));}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmI4d2I5cnB3cCIsImFjdHVhbENvdmVyYWdlIiwicmVnaXN0ZXIiLCJmIiwicmVzcG9uc2UiLCJzIiwianNvbkRhdGEiLCJPYmplY3QiLCJlbWFpbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInBhc3N3b3JkIiwiY29uZmlybVBhc3N3b3JkIiwiYiIsImlubmVySFRNTCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25sb2FkIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJ1bmRlZmluZWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzZW5kIiwic3RyaW5naWZ5Il0sInNvdXJjZXMiOlsicmVnaXN0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XHJcbiAgICB2YXIgcmVzcG9uc2UgPSBcIlwiO1xyXG4gICAgdmFyIGpzb25EYXRhID0gbmV3IE9iamVjdCgpO1xyXG4gICAganNvbkRhdGEuZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xyXG4gICAganNvbkRhdGEucGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xyXG4gICAgdmFyIGNvbmZpcm1QYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlO1xyXG4gICAgaWYgKGpzb25EYXRhLmVtYWlsID09IFwiXCIgfHwganNvbkRhdGEucGFzc3dvcmQgPT0gXCJcIiB8fCBjb25maXJtUGFzc3dvcmQgPT0gXCJcIikge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JcIikuaW5uZXJIVE1MID0gJ0FsbCBmaWVsZHMgYXJlIHJlcXVpcmVkISc7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoanNvbkRhdGEucGFzc3dvcmQgIT0gY29uZmlybVBhc3N3b3JkKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvclwiKS5pbm5lckhUTUwgPSAnUGFzc3dvcmQgZG9lcyBub3QgbWF0Y2ghJztcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCBcIi9yZWdpc3RlclwiLCB0cnVlKTtcclxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2UgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2luZGV4Lmh0bWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvclwiKS5pbm5lckhUTUwgPSAnQXV0aGVudGljYXRpb24gZmFpbGVkISc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJlcXVlc3Quc2VuZChKU09OLnN0cmluZ2lmeShqc29uRGF0YSkpO1xyXG59XHJcblxyXG4iXSwibWFwcGluZ3MiOiJraEdBZVk7QUFBQUEsY0FBQSxTQUFBQSxDQUFBLFNBQUFDLGNBQUEsV0FBQUEsY0FBQSxFQUFBRCxjQUFBLEdBZlosUUFBUyxDQUFBRSxRQUFRQSxDQUFBLENBQUcs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