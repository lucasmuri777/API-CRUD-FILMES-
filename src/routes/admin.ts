import { Router } from "express";
import * as auth from "../controllers/auth";
import * as filmes from "../controllers/filmes";
import { getRedis } from "../services/redisConfig";

const router = Router();

router.get('/login', auth.login);

router.get('/ping', auth.validate, async(req, res) => {
    
    res.json({
        pong: true
    })
});

//pegar todos os filmes
router.get('/filmes', auth.validate, filmes.getAll);
//pegar somente um filme 
router.get('/filmes/:id', auth.validate, filmes.getOne);
//criar um novo filme
router.post('/filmes', auth.validate, filmes.create);
//atualizar um filme
router.put('/filmes/:id', auth.validate, filmes.update);

//deletar um filme
router.delete('/filmes/:id', auth.validate, filmes.remove);


export default router;
