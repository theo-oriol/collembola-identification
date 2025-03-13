
export class DrawingService {
    drawRectable(coords: any,h:any,w:any,strDataURI:any) {
    var canvas =  <HTMLCanvasElement> document.getElementById('drawcoord');
    if (canvas === null || canvas === undefined) {
      console.log('Canvas not found');
      return;
    }
    if (canvas.getContext) {
      console.log('Canvas found');
      var canvasWidth: number = 0;
      var canvasHeight: number = 0;

      const screenWidth = window.innerWidth * 0.7; 
      const screenHeight = window.innerHeight * 0.7; 

      const imageAspectRatio = w / h;
      const screenAspectRatio = screenWidth / screenHeight;

      if (imageAspectRatio > screenAspectRatio) {
        // Image is wider than the screen ratio → Fit width
        canvasWidth = screenWidth;
        canvasHeight = screenWidth / imageAspectRatio;
      } else {
        // Image is taller than the screen ratio → Fit height
        canvasHeight = screenHeight;
        canvasWidth = screenHeight * imageAspectRatio;
      }


      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      //  canvas.style.position = 'absolute';
      // canvas.style.top = '0';
      // canvas.style.left = '0';

      

      var ctx = canvas.getContext('2d');
        if (ctx === null || ctx === undefined) {
            console.log('2d context not found');
            return;
        }

      var img = new Image;
      img.src = strDataURI;
      
      ctx.drawImage(img,0,0,canvasWidth,canvasHeight);

      ctx.fillStyle = "#D74022";
      for (var i = 0; i < coords.length; i++){
        console.log(coords[i]);
        ctx.strokeRect((coords[i]["y"]/2)*canvasHeight, (coords[i]["x"]/2)*canvasWidth, (coords[i]["h"])*canvasHeight, (coords[i]["w"])*canvasWidth);
      }
    }
  }

}
