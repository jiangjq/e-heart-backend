const { ImpulseRecordDao } = require('../impulseDao');

// 在service层对数据库查询到的数据做相应处理（如果有需要）
// 例如将多个表的内容组装到一起，统计提前完成饮食计划天数，统计有多少吃饭间隔在4小时以上，等等
//这里冲动记录没有需要特殊处理的，我直接返回了，这样也可以省去service层
class ImpulseRecordDao {
    async getAllImpulseRecordByUserId() {
        var records = ImpulseRecordDao.getAllImpulseRecordByUserId()
        return records
    }
}