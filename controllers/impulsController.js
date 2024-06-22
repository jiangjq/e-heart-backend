
const express = require('express');
const impulseService = require('../services/userService');
const router = express.Router();

// 在controller层中直接实现对客户端暴露的API，也可以用router文件设置用哪一个函数
// 响应哪一个请求

// 获取一个用户的所有冲动记录
// 需要提前定义好请求参数，返回格式
router.get('/:impulseRecored', async (req, res, next) => {
    try {
        const impulseRecords = await impulseService.getAllImpulseRecordByUserId(req.params.user_id);
        res.json(impulseRecords);
    } catch (error) {
        next(error);
    }
});

