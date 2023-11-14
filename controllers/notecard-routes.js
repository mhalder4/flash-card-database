const router = require("express").Router();
const { Users, Decks, Notecards } = require(".././models");



// Get all records
router.get("/:id", async (req, res) => {
  try {
    const dbData = await Notecards.findAll({
      where: {
        deck_id: req.params.id
      }
    });

    const notecards = dbData.map((notecards) =>
      notecards.get({ plain: true })
    );
    // res.render('homepage', {
    //   galleries,
    //   loggedIn: req.session.loggedIn,
    // });
    res.render('deck-edit', { notecards });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.put("/:id", async (req, res) => {
  try {
    const putInfo = req.body;

    const payload = await putInfo.map(item => {
      Notecards.update(
        {
          question: item.question,
          answer: item.answer,
          deck_id: req.params.id
        },
        {
          where: {
            id: item.id,
          }
        }

      );
    })

    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
})

// router.put("/:id", async (req, res) => {
//   try {
//     const putInfo = req.body;

//     const payload = await putInfo.map(item => {
//       Notecards.update(
//         {
//           question: item.question,
//           answer: item.answer,
//           deck_id: req.params.id
//         },
//         {
//           where: {
//             id: item.id,
//           }
//         }

//       );
//     })

//     res.status(200).json({ status: "success", payload });
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message });
//   }
// })

// Get one record by pk
// router.get("/:id", async (req, res) => {
//   try {
//     const payload = await Model.findByPk(req.params.id);
//     res.status(200).json({ status: "success", payload });
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message });
//   }
// })

// // Create a new record
// router.post("/", async (req, res) => {
//   try {
//     const payload = await Model.create(req.body);
//     res.status(200).json({ status: "success", payload });
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message });
//   }
// })

// // Update a new record
// router.put("/:id", async (req, res) => {
//   try {
//     const payload = await Model.update(
//       req.body,
//       {
//         where: {
//           id: req.params.id
//         }
//       }

//     );
//     res.status(200).json({ status: "success", payload });
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message });
//   }
// })

// // Delete a record
// router.delete("/:id", async (req, res) => {
//   try {
//     const payload = await Model.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(200).json({ status: "success" });
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message });
//   }
// })


module.exports = router;