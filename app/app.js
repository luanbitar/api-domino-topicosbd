var express = require('express');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

// Conexão com o MongoDB
// var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
var mongoaddr = 'mongodb://heroku_26c428v0:5g9ivhgo3mmtlekunhvaunei31@ds145871.mlab.com:45871/heroku_26c428v0';
console.log(mongoaddr);
mongo.connect(mongoaddr);

// CRUD Duplas
var duplaSchema = mongo.Schema({
  nome_1 : String,
  nome_2 : String
});
var duplaModel = mongo.model('dupla', duplaSchema);
app.get('/api/duplas', function (req, res) {
	duplaModel.find(function(err, todos) {
		if (err) {
			res.json(err);
		} else {
			res.json(todos);
		}
	})
});
function isDuplaInValid(body) { return (!body.nome_1 || !body.nome_2); }
app.post('/api/dupla', function (req, res) {
	if (isDuplaInValid(req.body)) {
    res.send('Campos inválidos.');
    res.end();
  }
  var register = new duplaModel({
    'nome_1'   : req.body.nome_1,
    'nome_2'   : req.body.nome_2
  });
  res.send(register);
  register.save(function (err) {
    if (err) {
      console.log(err);
      res.send(err);
      res.end();
    }
  });
  res.end();
});
app.delete('/api/dupla/:id', function(req, res) {
  duplaModel.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) { 
      res.status(404);
      res.send('Não foi possível encontrar uma dupla com esse ID');
    }else if (post) {
      res.send(`Dupla ${post.nome_1} e ${post.nome_2} deletada com sucesso!`);
    } else {
      res.send('Erro');
    }
  });
});
app.put('/api/dupla/:id', function (req, res, next) {
  if (isDuplaInValid(req.body)) {
    res.send('Campos inválidos.');
    res.end();
    next();
  }
	duplaModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      res.send('ID não encontrado.');
      res.end();
      next();
    } else if (post) {
      res.json(post);
      res.end();
      next();
    } else {
      res.send('Erro desconhecido.');
      res.end();
      next();
    }
  });
});
app.patch('/api/dupla/:id', function (req, res) {
  if ((req.body.nome_1 || req.body.nome_2) && isDuplaInValid(req.body)) {
    duplaModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err)  {
        res.json('ID não encontrado.');
      } else if (post) {
        res.json(post);
      } else {
        res.send(err);
      }
    });
  } else if (!isDuplaInValid(req.body)) {
    res.send('Campos inválidos.');
    res.end();
  } else {
    res.send('Erro desconhecido');
  }
});

// partidas
var partidaSchema = mongo.Schema({
  dupla_1 : String,
  dupla_2 : String,
  pontos_1: Number,
  pontos_2: Number,
  tempo  : Number,
});
var partidaModel = mongo.model('partida', partidaSchema);
app.get('/api/partidas', function (req, res) {
	partidaModel.find(function(err, todos) {
		if (err) {
			res.json(err);
		} else {
			res.json(todos);
		}
	})
});
function isPartidaInValid(body) { 
  return (!body.dupla_1 || !body.dupla_2 ||  !body.pontos_1 || !body.pontos_2 || !body.tempo)
      || (isNaN(+body.pontos_1) || isNaN(+body.pontos_2) || isNaN(+body.tempo));
}
app.post('/api/partida', function (req, res) {
  if (isPartidaInValid(req.body)) {
    res.send('Campos inválidos.');
  } else {
    var register = new partidaModel({
      'dupla_1' : req.body.dupla_1,
      'dupla_2' : req.body.dupla_2,
      'pontos_1': +req.body.pontos_1,
      'pontos_2': +req.body.pontos_2,
      'tempo'   : +req.body.tempo
    });
    register.save(function (err) {
      if (err) {
        res.send(err);
      }
    });
    res.send(register);
    res.end();
  }
});
app.delete('/api/partida/:id', function(req, res) {
  partidaModel.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) { 
      res.status(404);
      res.send('Não foi possível encontrar uma partida com esse ID');
    }else if (post) {
      res.send(`Partida entre ${post.dupla_1} e ${post.dupla_2} deletada com sucesso!`);
    } else {
      res.send('Erro');
    }
  });
});
app.put('/api/partida/:id', function (req, res, next) {
  if (isPartidaInValid(req.body)) {
    res.send('Campos inválidos.');
    res.end();
    next();
  }
	partidaModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      res.send('ID não encontrado.');
      res.end();
      next();
    } else if (post) {
      res.json(post);
      res.end();
      next();
    } else {
      res.send('Erro desconhecido.');
      res.end();
      next();
    }
  });
});
app.patch('/api/partida/:id', function (req, res, next) {
  if (isPartidaInValid(req.body)) {
    partidaModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) {
        res.json('ID não encontrado.');
        next();
      } else if (post) {
        res.json(post);
        next();
      } else {
        res.send(err);
        next();
      }
    });
  } else if (!isPartidaInValid(req.body)) {
    res.send('Campos inválidos.');
    res.end();
    next();
  } else {
    res.send('Erro desconhecido');
    next();
  }
});

// // jogos
var jogoSchema = mongo.Schema({
  dupla_vencedora: String,
  partida        : String,
  pontuacao      : Number,
  tempo          : Number,
});
var jogoModel = mongo.model('jogo', jogoSchema);
app.get('/api/jogos', function (req, res) {
	jogoModel.find(function(err, todos) {
		if (err) {
			res.json(err);
		} else {
			res.json(todos);
		}
	})
});
function isJogoInValid(body) { 
  return (!body.dupla_vencedora || !body.partida ||  !body.pontuacao || !body.tempo)
      || (isNaN(+body.pontuacao) || isNaN(+body.tempo));
}
app.post('/api/jogo', function (req, res) {
  if (isJogoInValid(req.body)) {
    res.send('Campos inválidos.');
  } else {
    var register = new jogoModel({
      'dupla_vencedora': req.body.dupla_vencedora,
      'partida'        : req.body.partida,
      'pontuacao'      : +req.body.pontuacao,
      'tempo'          : +req.body.tempo,
    });
    register.save(function (err) {
      if (err) {
        res.send(err);
      }
    });
    res.send(register);
    res.end();
  }
});
app.delete('/api/jogo/:id', function(req, res) {
  jogoModel.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) { 
      res.status(404);
      res.send('Não foi possível encontrar uma jogo com esse ID');
    }else if (post) {
      res.send(`Jogo dos campeões: ${post.dupla_vencedora}, deletada com sucesso!`);
    } else {
      res.send('Erro');
    }
  });
});
app.put('/api/jogo/:id', function (req, res, next) {
  if (isJogoInValid(req.body)) {
    res.send('Campos inválidos.');
    res.end();
    next();
  }
	jogoModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      res.send('ID não encontrado.');
      res.end();
      next();
    } else if (post) {
      res.json(post);
      res.end();
      next();
    } else {
      res.send('Erro desconhecido.');
      res.end();
      next();
    }
  });
});
app.patch('/api/jogo/:id', function (req, res, next) {
  if (isJogoInValid(req.body)) {
    jogoModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) {
        res.json('ID não encontrado.');
        next();
      } else if (post) {
        res.json(post);
        next();
      } else {
        res.send(err);
        next();
      }
    });
  } else if (!isJogoInValid(req.body)) {
    res.send('Campos inválidos.');
    res.end();
    next();
  } else {
    res.send('Erro desconhecido');
    next();
  }
});
//Porta do servidor
app.listen(process.env.PORT || 8080, function() {
	console.log('Porta:', process.env.PORT || 8080);
});