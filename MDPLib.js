/**
 * Created by Dzhambulat on 22.01.2015.
 */

function MDP(actions,rewards,transition)
{
    if (actions && rewards && transition)
    {
        this.setActions(actions);
        this.setRewards(rewards);
        this.setTransitionModel(transition);
    }
}

MDP.prototype.setActions=function (actions){

    if (!(actions instanceof Array)) {

        throw new Error('Actions must be in the array');
    }
    this.actions=actions;
}

MDP.prototype.setRewards=function (rewards){
    this.rewards=rewards;
}

MDP.prototype.setTransitionModel=function(modelCallback)
{
    if (!(modelCallback instanceof Function))
    {
        throw new Error('Transition model must be a function');
    }
    this.model=modelCallback;
}
MDP.prototype.copyMatrix=function(srcMatrix,dstMatrix)
{
    for (var i in srcMatrix)
    {
        for (var j in srcMatrix[i])
        {
            dstMatrix[i][j]=srcMatrix[i][j];
        }
    }
}

MDP.prototype.generatePolicies=function(){
    var bellmanOldMatrix=[];
    for (var i=0;i<this.rewards.length;i++)
    {
        bellmanOldMatrix.push(new Array(this.rewards[i].length));
        for (var j=0;j<bellmanOldMatrix[i].length;j++)
        {
            bellmanOldMatrix[i][j]=0;
        }
    }
    var bellmanMatrix=[];
    for (var i=0;i<this.rewards.length;i++)
    {
        bellmanMatrix.push(new Array(this.rewards[i].length));
        for (var j=0;j<bellmanMatrix[i].length;j++)
        {
            bellmanMatrix[i][j]=0;
        }
    }
    for(var i=0;i<100;i++)
    {
        for(var k=0;k<bellmanMatrix.length;k++)
        {
            for (var l=0;l<bellmanMatrix[k].length;l++)
            {
                for(var c in this.actions) // choose action which gives better state
                {
                    var max=undefined;
                    var command=this.actions[c];
                    var nextState=this.model(k,l,command);
                    var evaluation=this.rewards[k][l]+bellmanOldMatrix[nextState[0]][nextState[1]];
                    if (max===undefined)
                    {
                        max=evaluation;
                    }
                    else if (max<evaluation)
                    {
                        max=evaluation;
                    }
                }
                bellmanMatrix[k][l]=max;
            }
        }

        this.copyMatrix(bellmanMatrix,bellmanOldMatrix);
    }
}

