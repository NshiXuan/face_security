const video = document.getElementById("video")

async function getCamera() {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true // true 表示请求视频流
    })
    // 把 mediaStream 视频流分配给 video 节点
    video.srcObject = mediaStream
  } catch (error) {
    console.error("🚀 ~ getCamera ~ error:", error)
  }
}

async function loadModels() {
  // await faceapi.
}
