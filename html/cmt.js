(() => {
  var e = {
      7: () => {
        !(function () {
          const e = document.getElementById("dark-mode-checkbox"),
            t = document.documentElement,
            n = function () {
              t.classList.toggle("dark-mode", e.checked),
                localStorage.setItem("darkMode", e.checked ? "on" : "off");
            };
          e.addEventListener("change", n),
            window.addEventListener("load", function () {
              (e.checked = "on" === localStorage.getItem("darkMode")), n();
            });
        })();
      },
    },
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var s = (t[o] = {
      exports: {},
    });
    return e[o](s, s.exports, n), s.exports;
  }
  (() => {
    "use strict";
    n(7);
    const e = function (e) {
        if (/^\d+\s+\w+\s+ago$/i.test(e)) return e;
        const t = new Date(),
          n = new Date(e).getTime(),
          o = t.getTime() - n,
          r = 36e5,
          s = 24 * r,
          c = 7 * s,
          a = 30 * s,
          i = 365 * s;
        if (o < 6e4) return "Just now";
        if (o < r) {
          const e = Math.floor(o / 6e4);
          return `${e} minute${1 === e ? "" : "s"} ago`;
        }
        if (o < s) {
          const e = Math.floor(o / r);
          return `${e} hour${1 === e ? "" : "s"} ago`;
        }
        if (o < c) {
          const e = Math.floor(o / s);
          return `${e} day${1 === e ? "" : "s"} ago`;
        }
        if (o < a) {
          const e = Math.floor(o / c);
          return `${e} week${1 === e ? "" : "s"} ago`;
        }
        if (o < i) {
          const e = Math.floor(o / a);
          return `${e} month${1 === e ? "" : "s"} ago`;
        }
        const l = Math.floor(o / i);
        return `${l} year${1 === l ? "" : "s"} ago`;
      },
      t = {
        currentUser: null,
        comments: [],
      },
      o = function () {
        localStorage.setItem("allData", JSON.stringify(t));
      },
      r = function (n) {
        return {
          ...n,
          createdAt: e(n.createdAt),
          me: n.user.username === t.currentUser.username,
        };
      },
      s = function (n, o) {
        return {
          ...n,
          createdAt: e(n.createdAt),
          me: n.user.username === t.currentUser.username,
          parentId: o,
        };
      },
      c = async function (e, n, c) {
        try {
          const a = {
            content: n,
            createdAt: new Date(),
            id: +new Date().getTime().toString(),
            score: 0,
            user: {
              image: {
                png: t.currentUser.image.png,
                webp: t.currentUser.image.webp,
              },
              username: t.currentUser.username,
            },
            replies: [],
          };
          if (!e && !c) return t.comments.push(a), o(), r(a);
          if (!c) {
            const n = t.comments.find((t) => t.id === e);
            return (
              (a.replyingTo = n.user.username), n.replies.push(a), o(), s(a, e)
            );
          }
          const i = t.comments.find((e) => e.id === c),
            l = i.replies.find((t) => t.id === e).user.username;
          return (a.replyingTo = l), i.replies.push(a), o(), s(a, c);
        } catch (e) {
          throw (console.error(`${e} 💥💥💥`), e);
        }
      },
      a = new (class {
        _allCommentContainer = document.querySelector(
          ".all-comments-container"
        );
        renderMainComment(e) {
          const t = `\n    <div class="each-comment">\n      <div data-id="${
            e.id
          }" class="key${e.id} comment-wrapper">\n        ${this.commentMarkup(
            e
          )}\n      </div>\n      <div class="replied-comment-container"></div>\n    </div>\n    `;
          this._allCommentContainer.insertAdjacentHTML("beforeend", t);
        }
        renderRepliedComment(e) {
          const t = document.querySelector(
              `.key${e.parentId}`
            ).nextElementSibling,
            n = `\n    <div data-id="${e.id}" class="key${
              e.id
            } comment-wrapper">\n      ${this.commentMarkup(
              e
            )}\n    </div>\n  `;
          t.insertAdjacentHTML("beforeend", n);
        }
        renderUpdatedComment(e) {
          this._allCommentContainer.querySelector(`.key${e.id}`).innerHTML =
            this.commentMarkup(e);
        }
        scrolTo(e) {
          this._allCommentContainer.querySelector(`.key${e}`).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        commentMarkup(e) {
          return `\n        <div class="comment">\n          <div class="comment-user">\n            <div class="avater">\n              <img\n                src="${
            e.user.image.png
          }"\n                alt="${
            e.user.username
          }'s photo"\n              />\n            </div>\n            <p class="username">${
            e.user.username
          }</p>\n            ${
            e.me ? '<span class="you-txt">You</span>' : ""
          }\n            <p class="created-at">${
            e.createdAt
          }</p>\n          </div>\n\n          <p class="comment-content">\n          ${
            e.replyingTo
              ? `<span class="to-replied-username">@${e.replyingTo}</span>`
              : ""
          }\n          ${
            e.content
          }\n          </p>\n\n          <div class="comment-voting">\n            <button data-vote="up" class="btn-plus btn-voting" type="button">\n              <img src="./images/icon-plus.svg" alt="Plus icon" />\n            </button>\n\n            <p class="score">${
            e.score
          }</p>\n \n            <button data-vote="down" class="btn-minus btn-voting" type="button">\n              <img src="./images/icon-minus.svg" alt="Minus icon" />\n            </button>\n          </div>\n\n          <div class="comment-actions">\n            ${
            e.me
              ? '\n            <button class="action-btn delete-btn" type="button">\n              <img src="./images/icon-delete.svg" alt="Delete icon" />\n              <span>Delete</span>\n            </button>\n\n            <button class="action-btn edit-btn" type="button">\n              <img src="./images/icon-edit.svg" alt="Edit icon" />\n              <span>Edit</span>\n            </button>\n            '
              : '\n            <button class="action-btn reply-btn" type="button">\n            <img src="./images/icon-reply.svg" alt="Reply icon" />\n            <span>Reply</span>\n            </button>\n            '
          }\n          </div>\n        </div>\n    `;
        }
      })(),
      i = new (class {
        _allCommentContainer = document.querySelector(
          ".all-comments-container"
        );
        _body = document.querySelector("body");
        addHandlerDeleteBtn(e) {
          this._allCommentContainer.addEventListener("click", function (t) {
            if (!t.target.closest(".delete-btn")) return;
            const n = t.target.closest(".comment-wrapper"),
              o = n.dataset.id;
            let r = !1;
            "each-comment" === n.parentElement.className ||
              (r = n.parentElement.previousElementSibling.dataset.id),
              e(r, o);
          });
        }
        attachModalEventListeners(e, t, n) {
          const o = document.querySelector(".overlay"),
            r = document.querySelector(".modal"),
            s = document.querySelector(".btn-no"),
            c = document.querySelector(".btn-yes"),
            a = () => {
              i(),
                setTimeout(() => {
                  o.remove(), r.remove(), (this._body.style.overflow = null);
                }, 200);
            };
          s.addEventListener("click", a),
            o.addEventListener("click", a),
            c.addEventListener("click", () => {
              i(),
                setTimeout(() => {
                  n(e, t),
                    o.remove(),
                    r.remove(),
                    (this._body.style.overflow = null);
                }, 200);
            });
          const i = function () {
            o.classList.toggle("hide"), r.classList.toggle("hide");
          };
          setTimeout(() => {
            i();
          }, 10);
        }
        renderModal(e, t, n) {
          this._body.insertAdjacentHTML(
            "afterbegin",
            '\n            <div class="overlay hide"></div>\n            <div class="modal hide">\n              <h1>Delete comment</h1>\n              <p>\n                Are you sure you want to delete this comment? This will remove the comment and can\'t be undone.\n              </p>\n              <div class="modal-btns-container">\n                <button class="modal-btn btn-no">No, cancel</button>\n                <button class="modal-btn btn-yes">Yes, delete</button>\n              </div>\n            </div>\n          '
          ),
            this.attachModalEventListeners(e, t, n),
            (this._body.style.overflow = "hidden");
        }
        deleteCommentFromDOM(e, t) {
          const n = this._allCommentContainer.querySelector(`.key${t}`);
          e ? n.remove() : n && n.closest(".each-comment").remove();
        }
      })(),
      l = new (class {
        _allCommentContainer = document.querySelector(
          ".all-comments-container"
        );
        addHandlerEditBtn(e) {
          this._allCommentContainer.addEventListener("click", function (t) {
            if (!t.target.closest(".edit-btn")) return;
            const n = t.target.closest(".comment-wrapper"),
              o = n.dataset.id;
            let r = !1;
            "each-comment" === n.parentElement.className ||
              (r = n.parentElement.previousElementSibling.dataset.id),
              e(r, o, !1);
          });
        }
        addHandlerUpdateBtn(e) {
          this._allCommentContainer.addEventListener("click", function (t) {
            if (!t.target.closest(".update-btn")) return;
            const n = t.target.closest(".comment-wrapper"),
              o = n.dataset.id;
            let r = !1;
            "each-comment" === n.parentElement.className ||
              (r = n.parentElement.previousElementSibling.dataset.id);
            const s = n.querySelector(".comment-content").value;
            e(r, o, s);
          });
        }
        renderEditingField(e) {
          document.querySelector(`.key${e.id}`).innerHTML =
            this.generateEditFieldMarkup(e);
        }
        generateEditFieldMarkup(e) {
          return `\n          <div class="update-comment comment">\n            <div class="comment-user">\n              <div class="avater">\n                <img\n                  src="${e.user.image.png}"\n                  alt="${e.user.username}'s photo"\n                />\n              </div>\n              <p class="username">${e.user.username}</p>\n              <span class="you-txt">You</span>\n              <p class="created-at">${e.createdAt}</p>\n            </div>\n    \n            <textarea\n              class="comment-content"\n              rows="3"\n              placeholder="Update your comment..."\n            >${e.content}</textarea>\n    \n            <button class="write-comment-btn update-btn" type="button">Update</button>\n    \n            <div class="comment-voting">\n              <button class="btn-plus btn-voting" type="button">\n                <img src="./images/icon-plus.svg" alt="Plus icon" />\n              </button>\n    \n              <p class="score">${e.score}</p>\n    \n              <button class="btn-minus btn-voting" type="button">\n                <img src="./images/icon-minus.svg" alt="Minus icon" />\n              </button>\n            </div>\n    \n            <div class="comment-actions">\n              <button class="action-btn delete-btn" type="button">\n                <img src="./images/icon-delete.svg" alt="Delete icon" />\n                <span>Delete</span>\n              </button>\n    \n              <button disabled="true" class="action-btn edit-btn" type="button">\n                <img src="./images/icon-edit.svg" alt="Edit icon" />\n                <span>Edit</span>\n              </button>\n            </div>\n          </div>\n        `;
        }
      })(),
      d = new (class {
        _newCommentInputEl = document.querySelector(".new-comment");
        getNewComment() {
          const e = this._newCommentInputEl.querySelector(
            ".write-main-comment-field"
          ).value;
          return this._clearInput(), e;
        }
        _clearInput() {
          this._newCommentInputEl.querySelector(
            ".write-main-comment-field"
          ).value = "";
        }
        addHandlerNewComment(e) {
          this._newCommentInputEl
            .querySelector(".write-main-comment-btn")
            .addEventListener("click", function () {
              e();
            });
        }
      })(),
      m = new (class {
        _allCommentContainer = document.querySelector(
          ".all-comments-container"
        );
        addHandlerReplyBtn(e) {
          this._allCommentContainer.addEventListener("click", function (t) {
            const n = t.target.closest(".reply-btn");
            if (!n) return;
            n.classList.remove("reply-btn");
            const o = t.target.closest(".comment-wrapper").dataset.id;
            e(o, !1, !1);
          });
        }
        async renderReplyField(e, t) {
          const n = document.querySelector(`.key${e}`),
            o = await this.generateReplyFieldMarkup(t);
          n.insertAdjacentHTML("beforeend", o),
            n
              .querySelector(".cancel-reply")
              .addEventListener("click", function () {
                n.querySelector(".action-btn").classList.add("reply-btn"),
                  n.querySelector(".reply-comment").remove();
              });
        }
        async generateReplyFieldMarkup(e) {
          return `\n        <div class="write-comment reply-comment">\n          <div class="write-comment-avater">\n                <img\n                    src="${e.image.png}"\n                    alt="${e.username}'s photo"\n                />\n                </div>\n\n                <textarea\n                class="write-comment-field"\n                rows="3"\n                placeholder="Add a comment..."\n                ></textarea>\n\n                <div class="reply-footer-buttons">\n                  <button class="cancel-reply" type="button">Cancel</button>\n                  <button class="write-comment-btn submit-reply" type="button">Reply</button>\n                </div>\n          </div>\n        </div>\n        `;
        }
        addHandlerSubmitReply(e) {
          this._allCommentContainer.addEventListener("click", function (t) {
            if (!t.target.closest(".submit-reply")) return;
            const n = t.target.closest(".comment-wrapper"),
              o = n.dataset.id;
            let r = !1;
            "each-comment" === n.parentElement.className ||
              (r = n.parentElement.previousElementSibling.dataset.id);
            const s = n.querySelector(".write-comment-field").value;
            n.querySelector(".action-btn").classList.add("reply-btn"),
              n.querySelector(".reply-comment").remove(),
              e(o, s, r);
          });
        }
      })(),
      u = new (class {
        _allCommentContainer = document.querySelector(
          ".all-comments-container"
        );
        addHandlerVoting(e) {
          this._allCommentContainer.addEventListener("click", function (t) {
            const n = t.target.closest(".btn-voting");
            if (!n) return;
            const o = t.target.closest(".comment-wrapper"),
              r = o.dataset.id;
            let s = !1;
            "each-comment" === o.parentElement.className ||
              (s = o.parentElement.previousElementSibling.dataset.id);
            const c = n.dataset.vote;
            e(s, r, c);
          });
        }
        renderScore(e, t) {
          this._allCommentContainer
            .querySelector(`.key${e}`)
            .querySelector(".score").textContent = t < 0 ? 0 : t;
        }
      })();
    !(function () {
      const n = async function (e, n, o) {
          if (!n) {
            const n = t.currentUser;
            return void m.renderReplyField(e, n);
          }
          const r = await c(+e, n, +o);
          a.renderRepliedComment(r), a.scrolTo(r.id);
        },
        p = function (n, r, s) {
          if (!s) {
            const o = (function (n, o) {
              if (!n) {
                const n = t.comments.find((e) => e.id === o);
                return {
                  ...n,
                  createdAt: e(n.createdAt),
                };
              }
              const r = t.comments
                .find((e) => e.id === n)
                .replies.find((e) => e.id === o);
              return {
                ...r,
                createdAt: e(r.createdAt),
              };
            })(+n, +r);
            return void l.renderEditingField(o);
          }
          const c = (function (n, r, s) {
            if (!n) {
              const n = t.comments.find((e) => e.id === r);
              return (
                (n.content = s),
                o(),
                {
                  ...n,
                  createdAt: e(n.createdAt),
                  me: !0,
                }
              );
            }
            const c = t.comments
              .find((e) => e.id === n)
              .replies.find((e) => e.id === r);
            return (
              (c.content = s),
              o(),
              {
                ...c,
                createdAt: e(c.createdAt),
                me: !0,
              }
            );
          })(+n, +r, s);
          a.renderUpdatedComment(c);
        },
        v = function (e, n) {
          !(function (e, n) {
            if (!e) {
              const e = t.comments.findIndex((e) => e.id === n);
              return t.comments.splice(e, 1), void o();
            }
            const r = t.comments.find((t) => t.id === e),
              s = r.replies.findIndex((e) => e.id === n);
            r.replies.splice(s, 1), o();
          })(+e, +n),
            i.deleteCommentFromDOM(e, n);
        };
      d.addHandlerNewComment(async function () {
        try {
          const e = d.getNewComment();
          if (!e) return;
          const t = await c(!1, e, !1);
          a.renderMainComment(t);
        } catch (e) {
          console.log(e);
        }
      }),
        l.addHandlerEditBtn(p),
        l.addHandlerUpdateBtn(p),
        i.addHandlerDeleteBtn(function (e, t) {
          i.renderModal(e, t, v);
        }),
        u.addHandlerVoting(function (e, n, r) {
          const s = (function (e, n, r) {
            const s = t.currentUser.voted.hasOwnProperty(n);
            let c;
            if (
              ((c = e
                ? t.comments
                    .find((t) => t.id === e)
                    .replies.find((e) => e.id === n)
                : t.comments.find((e) => e.id === n)),
              !s)
            ) {
              if (((t.currentUser.voted[n] = r), "up" === r))
                return (c.score += 1), o(), c.score;
              if ("down" === r) return (c.score -= 1), o(), c.score;
            }
            return t.currentUser.voted[n] === r
              ? (o(), c.score)
              : "up" === r
              ? ((t.currentUser.voted[n] = r), (c.score += 2), o(), c.score)
              : "down" === r
              ? ((t.currentUser.voted[n] = r), (c.score -= 2), o(), c.score)
              : void 0;
          })(+e, +n, r);
          u.renderScore(n, s);
        }),
        m.addHandlerReplyBtn(n),
        m.addHandlerSubmitReply(n);
      const y = function (e) {
          const t = r(e);
          a.renderMainComment(t);
        },
        g = function (e, t) {
          const n = s(e, t);
          a.renderRepliedComment(n);
        };
      !(async function () {
        const e = await (async function () {
            const e = localStorage.getItem("allData");
            if (e) {
              const n = JSON.parse(e),
                { currentUser: o, comments: r, voted: s } = n;
              return (t.currentUser = o), (t.comments = r), (t.voted = s), n;
            }
            {
              const e = await fetch("./json/data.json").then((e) => e.json()),
                n = {
                  ...e.currentUser,
                  voted: {},
                };
              return (t.currentUser = n), (t.comments = e.comments), o(), e;
            }
          })(),
          { comments: n } = await e;
        for (let e = 0; e < n.length; e++) {
          const t = n[e];
          if ((y(t), t.replies.length > 0)) {
            const e = t.replies;
            for (let n = 0; n < e.length; n++) {
              const o = e[n];
              g(o, t.id);
            }
          }
        }
        const r = document.querySelector(".container"),
          s = document.querySelector("footer").scrollHeight;
        r.style.minHeight = `calc(100vh - 2.5rem - ${s}px)`;
      })();
    })();
  })();
})();
