const {Router} = require('express')
const path = require('path')
const fs = require('fs')
const router = Router()

async function getStat() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', 'data', 'results.json'),
      'utf-8',
      (err, content) => {
        if(err) {
          reject(err)
        } else {
          resolve(JSON.parse(content))
        }
      }
    )
  })
}

async function addStat(team) {
  const candidates = await getStat()
  const idx = candidates.teams.findIndex(c => c.team === team)
  candidates.teams[idx].count ++
  candidates.totalCount ++
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, '..', 'data', 'results.json'),
      JSON.stringify(candidates),
      (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}

router.post('/', async (req, res) => { 
  await addStat(req.body.teams)
  res.redirect('/stat')
})

router.get('/', async (req, res) => {
  const stat = await getStat()

  res.render('stat', {
    title: 'Результаты',
    isStat: true,
    teams: stat.teams,
    totalCount: stat.totalCount
  })
})

module.exports = router