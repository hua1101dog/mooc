// import SockJS from  'sockjs-client'
// // import  Stomp from 'stompjs';
// export function connectionSocket(url) {
//   let stompClient = new SockJS(url) // 初始化 websocket
//   stompClient.onopen = function () {
//       console.log('Info: connection opened.')
//   }
//   stompClient.onmessage = function (event) {
//     console.log('Received: ' + event.data)  //处理服务端返回消息
//     var jsonObj = JSON.parse(event.data);
//     // 处理弹框消息
//     if (jsonObj.msg || jsonObj.dataType == 'workunit') {
//         // 新的应急工单
//         jsonObj.equipment_id && fac.showVideo(jsonObj.equipment_id);
//         // if ($scope.alerts.length > 3) {
//         //     $scope.alerts.shift();
//         // }
//     } else if (jsonObj.dataType == 'fire') {
//         // 火警实时播报
//         if (jsonObj.data.fireList) {
//             //$scope.$broadcast('fireBroadcast', jsonObj.data.fireList);
//         }
//     }
//   }
//   stompClient.onclose = function (event) {
//     console.log('Info: connection closed.')
//     console.log(event)
//   }
// }
