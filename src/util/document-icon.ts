export default class DocumentIcon {
    static FOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAC4jAAAuIwF4pT92AAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADJSURBVHja7NgxCgIxEIXhP66VYCN4hz2Bpd5ArawsPI6dC95iQfAKVlbewNYjuGBjbHQLEVlDNgzypkoT+JhkJkyc9x7L0cF4CPj3wG69OizmQAEMGu69AEvg1IpsUr4BYfdjRnNgA4xTHXFIv8lS3sEqYH9lvUhu6YokLEbAHnCRPO551Y7AOgZwCMxaSNz0BbTaB6/WG/VdT52AAgoooIACCiiggALGBmbWgT1Drv6nuXgLrIwAz/WgrC9gAQX8Hg8AAAD//wMA9KYZKpJqQ+8AAAAASUVORK5CYII=";

    static Excel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbRJREFUeNpi1MxzYhgIwMQwQGDU4lGLRy0e+hazkKqBl5NHU1rZVNVAWkgCyFCXVtbKd6aJxUALpIXEgTYBrdGQVpESEqeHjxfm9pmq6JOnJmFy0ak7F4d+HGOCG0/vQmIESD599wJIAmOEl5ObCqn62buXro3RQBIrt33d1PjJRetP7QQiIAOIbjy9Qx0fAxNUtmd81dLOBbl9QC6QAeTCUxlyHGd7xFE5qAPM3PZeOrL44DpIjgJyKQxqEuK4Lbo8qCsNyFhXNgtZHBjUIL96xvNx8kDYxOQFKiQuZGti7YOoX2RO3bEwwNwdiIAM+mWn03cunrp9cV3ZTCA7qCsdyIX7EpiMIUENctz2hdQM6s/fv+bMqVsETtKgSI0ui5tctKd+GSQFVQZla0grQxKXGdg+YOKijo+B+RJoGbA+gHCBDCAXKGgKtUYZ7j/iS3KiLMYMNyddazibhkGNH9AwqPEDGgY1MZUEJvj0/SseXYz4+06Q9oaGjAow9CDtDUw1NGmBfP7+BViZI9fnwFiEuAPULCGUgqgZ1GjuICYd0aQFQkzVO9quHrV41OJhajFAgAEAmCyqELfgWisAAAAASUVORK5CYII=";
    static Word = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhpJREFUeNrsVz1PwlAUrYZgInaiOpQBmGiKcWpZSXBygkQTHXRwxD/gYOLgxG6E0ehklIXRQRMHFh6jEpyUgS7CIkICk4cWmgqtUvIKknDTNHnt7Tv3nvv1uhDeTTPTkEVmSjIHng1g3yq7KQdxH+Nbly1tIcAJfk4IeNU7t7LsxsPDs1z1o0ETmPUsCX5vH4wL+b0UqTYBPtqRuz4FOJ5jnYuxKbBkdxfY+rtC7qk8EA4XFfP/tJWUqo4Ap7NF0+cRkZdE/n/V8YSotgH81eogKnoJKbVGo9nRl6+VOutx62lfLCmmm/BrrFVpWAJ/ttrbx7fPN8leFO+KSJD7831teZJ5hJf6pgUL4AjD2wbGByhluKJlR7lS0/zGc5BRfq9FRJ8jVENkkS+owCAWDVmOhsiLEo+GCqUqXmn9kj7VkE0peJElDCMRFUkWfeksATApKZgNRk1VzUQSUQH6toHha7lSV8tfQW9CZoFhbZlIxoyal6dxyuWEDgAa9fTWot5otgcGBmWqITEpmLrOYzrpUcdSNqSVI1R3kcI8Kudga6NnhxxMXeWHc5g+1SBKL+XhpYNUjyj0qR5RxqB6xqcTzntzqidDtdXRRxdl6OBtAry+l0GHQnfERELPsjo0/QQmdDzGGCCGnqAZEfJzEdUg40B0lmoMJVwP5C3d/2XiMZ5Fn3bun1yMMaxwEYs2Of8/ngNPG/hbgAEAGAbU2PM0mVEAAAAASUVORK5CYII=";
    static PPT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeZJREFUeNpi/OCiwDAQgIlhgMCoxcPfYhbynSwuwyQhw6Jv8efiCSCiocVAO0CWqWgxK4MQIzcvXIqaFsM9xKSsBWQwK2lSN6gZMQsQ7t4VaB7CD/69fMokLo1fzc/FE38smkDAxyx65qPZiRTwtSTyc4zt72O76WHx33vXvzWkAxEs1p98q08DxittLf5399qXdK/fR3f9//IJWRyYmoDpjoYW/717DZfUr3XzyC9AgHGGnLmZ9S3Y3ILxqGcLSgLmfqh6ZS2KSi7unuXwuPwJDMC71zgya7GE+Ysnfy6dZOThYwZbDCqCcOdv0spqYPnFWdrzOcYGu8Uvn3wtjoBzObLq2AMTqRbHxJdorFZuVKud/n/9DEwvaCYyCopiquSIK8BfjrIQk2iR0xcw4XCWdqMYYWoPDFVg3EOyEzBq2eMK8CdAoiwGVhjwxIULAOMSiIBJD5IOaNsQwJr06NECQbQCTh/8fWAz9pTIw8fVMJP8oCbgdlN7Np8o6tdOWLPsQDb2aB7UhN1Oo6Ae2k0fYP1B/aD+vWsNWguSzMQFLCCB5SIjsOoFtt2p3ZzGZzFalwToCGBWhjTrqdjyJRzUaO6A9F8gHRlK3MFI4VAE0HpgpQRsAtC7AMHT0hvtmA8SiwECDACYx6tdrE0UiwAAAABJRU5ErkJggg==";
    static VISO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlRJREFUeNpitAiZxzAQgIlhgMCoxaMW4wU83GxG2hKSojxk6GUhSTXYGl5VRSE1BSFVBSEeLjagYHbD9uevv1DTYqDRkmI8agrCQAbQJgmyfEasxcBwSwkzBNpnqCVB0zjGsFiMx8tBhSQjgOFhpC2JX83W/bfRooOFcrcD44KgW89dfY5m8XDMx3uP3SfT4i/ffk1YcApIIgseOv3oBRGZp23GkdoJB0Jz15BjMTCbbj1w+9CpR8iCE+afPHf1BUFbdx2+t25qKJCNy24WgiUG0Bp42rn94B0wjdiZyWGqdI1fCkzeQMav33+v3n69uDcAmO9XTw6xiViwcus1MiyWXLnlKiJXHLgDtBVSYGFmqmmNnjBlt5smH5rW4JlYsQno6HBvrUOnH5KWuIy0JIBehEfqoVMP7U3lCUawt4Mq0DK3xKWG2hJVGTbkpGpQgczNBolUPOGM1W4tFVFcthKVnSDRDEnPuMIZK2BjZaYoHwOjGVjuABkHiQtnqhUg9qZywBA+f+0FMKixhvOJC0+y6rergZM0NetjYK4AVlnNUw7jCWd4eqZyQwAY2sAcAqwuCaqE52Zw5SFEqcVAvz5//RlPeoaXZci5mQo+tjOVAyJcsrISvJDUB8pFjirUDGr8QFqCn9S2w4hsV1MhqG89ePt8NYEa+vmrLwQsBqZPy9D58IYtMAcDGfAmNFYALFgI1tDE+hhoFhAhNwGAVQUwXwJb80B3AEtvoDtUSSyqyAzqL19/gb31Aq0RDnQHZjDSPI6BZTgZnZfRbuqoxTQGAAEGAGF93c984LgSAAAAAElFTkSuQmCC";
    static PDF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdJJREFUeNpiPGRmyjAQgIlhgMCoxUPGYm41NfI0spCmmpeXW1WNR00NaB+HpCS/kRFQ8LC5GfUthlgAtInfyJhDSpJdQpJaQY1uMdAaYXsHZA/RCKBbLO7jI5eSSpIRetNnEHTiozmzH86ePZqdRpbFBLLTx3PnPp47i5b6qJKpmAhZfJaZlxeYiSEIyL5aWgp0DT2CmkcVWHoYQZB0eIR0RCRaxkAGVwoLv96+TZM4FjDGl2W55OT+fP5ME4tfbtkCLDsprzYIVxIvt26BpK8/n7+8PXiAXVJKq7sbl+Ifz58B1QNjhAoWA30AjGYIWy41lYWHB5fKP1++8Bsbf711C5j6gKECdCi3qir5FkMSFzGh92zFcmAFwy4m9vbgwW+PHvGoqgLjG5deFqqUBkC/Am0FMtglJYG+FHF0ArJ/vniOJ8dTweIfz5+/2LiBiZ1dtaoaWRx/OUPAYkj9j18NqKWgpSXu7UPNIpPI2CUmGY9Wi6MW0wYAsxyBVP3h7Dl+o3PAYhJP0YgGLmVmUKEFAqwPLmWeheROYH0ArARBZbWaGhWb8gTyMTBwgAje7oF0XqjoDmKLTGBxD3QEmjtAXRtjMnsbjKNDEaMW0woABBgAdOeQt3JRnJ4AAAAASUVORK5CYII=";
    static TXT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAC4jAAAuIwF4pT92AAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAABNklEQVR42uyYvUrEQBSFv/lJNrsgKhoVg1tqJ9hYCNttuy9g70NY2PoQPou1hY1gp6UWImhh4+6ykrGYHaJYuMUMRLmnucU9yXw580MSdXzmHC2WpuUSQAEUwF9kFzEpBRenMJ7C5TUc7cPNPez14fEZdjbh9Q26hfePJ7C23PTuHuBgF65uYXgI3Q6cnEcEdA5688Ez6wfI57WTN7XIvaeuv/eCN1wb7hUNMKhXwGgA1vgkjIaqBK2h2gAVHgjQqultl947GnjI6FP8VWEAa3w1oaqf3tAL3swmWoMAsw94eomz8KsyAaA1sL4S6ejQCQDrGt4ncQDDZooL6OIBri4lAMws9LdaelD/iU0iCUqCkmBLE/wfL6wyxZKgJCgJSoIeMNY3yXS2uFfJD0wBFEABTKvPAQDeKlTKYa/l4AAAAABJRU5ErkJggg==";
    static IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAX1JREFUeNpiVK3fwjAQgIlhgMCoxcPfYhZKNPNxsGpK8AEZJx+8pa3F5grC0gKcQMvAiJ+XA6R98oHbVLYYbAc/xBoZAU4NsOdoFdRAy/Ic1ICkmYIwXeNYRoAr0ECGJCOA4bEkwQK/mtYd166/+ES1xAVPYmYKQgTVjBYgQ8DiUw/eniI9v1LB4pMP3gHRYAzqGy8+3UDNM7QqqzEKH66B8TGk6AaCzz/+ZK04Sz+LKzZcbN1xFVxt3Npz4wWw8qBaUPNx4FS//sKTdReeABmffvwB2gqx3lVDHFfVwkRkqtlz4yXQOBcNCVwKyjdchLAhtkIAXJBMHwPL9ycfvk+LMAHWWrjU4KongPHNiy2ciLKYYH1FRlU9WlaPWjw429UQ8OTDt5MH3hJUQ8BiYAtZrWErsP0GbkkJA1u1kEYuL+4y6+mH78BCijo+hrQIkZvpkE6DNMgdXFRpZhMb1J9+/MbsLgDdIUNKVUi1OAYGMhCNZqdRiweZxQABBgC9HoV3VL8/FgAAAABJRU5ErkJggg==";

    static FILE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO1JREFUeNpi/P//P8NgBywgIq32z6B2KRPDEACjjhx15KgjaenIkmRmBjUFRoZZzSxgGoYp4YPMJLqcJBbISjKi0Oji5PIJAUZQjUNMYQ4LSWqCWw/+M/TM/TuacUYdOerIQeXI6DrixKjWniTXgbgcurQJUw4kRteQhFkIopExumOQxUCOJjekWSiJBlyWooc0rtAdFBmHkiim2JH4QgQWariSB13TJHq6RGeT40Ga5G70TIJNHN1h5ITmaCtotFocdeSoI0cdOerIUUeSXnev3PaPgYuDupZ/+0FlRz5+/n80ukcdOepIKAAIMAAPqF7LK/tUzQAAAABJRU5ErkJggg==";

    static ZIP = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAONJREFUeNpiVNj9j2EgABPDAIFRi+kGWPDIyXAyyHBgl7r2meHTHyjbQhC7mic/GJ58J8viEEnGfCV0wYn3IPT/E+/hFjMCSawqJ9z7P6SCGiuA+OzEWXQRmlt88j12EXNBGluMGW0QkeXGjLS1GGJB5Nn/aCLDIh9jBch+RRYZDWqq+1hxz3+0YhIict+FxkENsQA5qEm1cjRVEwkKlBjRyi+ICM19DCmT69QY4fUxqaU0mRZDgCbvaJtr1OJRi0ctHrV4UFSLa54jOkhkAGCnjUyLgX09PN290TgetZgAAAgwAL17TKEhJC37AAAAAElFTkSuQmCC";

    static Meida = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhxJREFUeNpitLeYzTAQgIlhgMCoxaMW4wU8PGwGRpIqqsJk6GUhSTXQGglJXglJHkOwfdw8bEDBBXPP3bn9lpoWA+1QURVSURNWVRUGspVVhagY1CyYliWkGElK8ugbShIfDEAt+NUsmHOOQBwDg9HDS5V4WyFuxa8gIdmI0jjGCl48/4zpIYIWj+Zj9EQx99zd2++QRS6ef44mQhOLjxx8eP7cM2SRyf0ntm+9Rf3shJlVLpx7HhKuA+G+fPEFWFZU1tpjVQwsUhJTjHh4QaXK+XPP8ac4AhYDS6jq8itw7uGDD3CVJEAnTpjqDecCMyRQb37WVjKDGmgcJF4hXKDvbezksaqEBMPRQw+BoQK328NbjUyLgaUxMACB4QZkf/3y68ihh544zBKX4AGSt2+/DQ9cMWXCCaBiSHFEfnaCRDMonA89pGKJTbjkAkbVmpVXwCn8Aa5whqQ7oKeB1cnK9REQ34MLtS8U+RgSeXjCGQjamw8CSWs7ebitwJSxA3fGI+xjSDQDzcUfzsDoSIlbT7XsBAE29vJAU/AkUQgAZvHq8t3ULKtt7RSAAe5JyGLqN32AIYxcOIw2b2kX1ASbPgTbXDTxMbDpQ7BSJ+xjYHZ0sJwDzLjA7AhMycAmu6qaMLwJjSsH48+yJAQ1pIEOKaIxW/OqYGeR1BKlKI7B7niOFrtAd3z5/IveiQsYuwQjeDQfj1pMdwAQYAAQU8IXpxlBYwAAAABJRU5ErkJggg==";
}