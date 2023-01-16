const app = getApp()
const db = wx.cloud.database({
    env: 'daytips-rr1wj'
});
const getHomeList = function () {
    db.collection('homelist').where(db.command.or([{
            owner: {
                id: app.globalData.cloudID,
                username: app.globalData.nickName
            }
        },
        {
            guest: db.command.all([app.globalData.cloudID])
        }
    ])).get({
        success: (res) => {
            console.log(4)
            app.globalData.homelist=res.data
        }
    })
};
export default getHomeList