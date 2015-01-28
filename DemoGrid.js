/**
 * Created by Dzhambulat on 28.01.2015.
 */
(function(){
    var gridData={
        rewards:[[-3,-4,-3,-2,100],[-1,-2,5,-2,-4],[-1,-3,-1,-1,-1],[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1]]
    }

    var gridView={
        drawGrid:function(gridSelector,cell_width){
            var grid=document.getElementById(gridSelector);
            var cnx=grid.getContext('2d');
            cnx.font="30px serif";
            for(var i=0;i<gridData.rewards.length;i++)
            {
                for(var j=0;j<gridData.rewards.length;j++)
                {

                    cnx.rect(j*cell_width,i*cell_width,cell_width,cell_width);
                    cnx.fillText(gridData.rewards[i][j],j*cell_width+5,i*cell_width+25);
                }
            }

            cnx.stroke();

        },

        drawMarker:function(gridSelector,x,y,cell_width)
        {
            var grid=document.getElementById(gridSelector);
            var cnx=grid.getContext('2d');

            cnx.beginPath();
            cnx.arc(x*cell_width+10,y*cell_width+10,10,0,2*Math.PI);
            cnx.stroke();
        }
    }

    gridView.drawGrid('demo_grid',50);
    gridView.drawMarker('demo_grid',0,4,50);

})();