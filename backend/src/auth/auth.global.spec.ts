import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UnauthorizedException } from '@nestjs/common'

describe(`AuthService`, () => {
  let authService: AuthService
  let usersService: UsersService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, PrismaService],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  describe(`flush DB`, () => {
    it(`flush userDB`, async () => {
      await usersService.deleteAll()
    })
  })

  //TODO -> Gael fixe le cast stp merciii
  describe(`signUpLocal`, () => {
    it(`Génération de comptes classiques avec combo mail/pass ou username/pass, ne doit pas générer d'erreur`, async () => {
      for (let i = 0; i < 10; i++) {
        const input = {
          username: `BITE${i}`,
          email: `grostest${i}@example.com`,
          password: `Pas$w0rd23()`,
        }

        jest.spyOn(usersService, `findOneByEmail`).mockResolvedValueOnce(null)

        const result = await authService.signUpLocal(input)
        expect(result.username).toEqual(input.username)
        expect(result.email).toEqual(input.email)
        expect(result.password).toHaveLength
        expect(result.githubId).toEqual(null)
        expect(result.googleId).toEqual(null)
        expect(result.school42Id).toEqual(null)
        expect(result.discordId).toEqual(null)
      }
    })

    describe(`signinLocal`, () => {
      it(`Les comptes créés précedemment essaient maintenant de se connecter`, async () => {
        for (let i = 0; i < 10; i++) {
          const input = {
            emailOrUsername: `grostest${i}@example.com`,
            password: `Pas$w0rd23()`,
          }

          const associatedUser = await usersService.findOneByEmail(
            input.emailOrUsername,
          )

          const result = await authService.signInLocal(input)

          expect(result.username).toHaveLength
          expect(result.email).toEqual(input.emailOrUsername)
          expect(result.password).toHaveLength
          expect(result.githubId).toEqual(null)
          expect(result.googleId).toEqual(null)
          expect(result.school42Id).toEqual(null)
          expect(result.discordId).toEqual(null)
          expect(result.id).toEqual(associatedUser.id)
        }
      })

      describe(`GoogleAuthCreate`, () => {
        it(`Génération de comptes via google auth, ne doit pas générer d'erreur`, async () => {
          for (let i = 10; i < 20; i++) {
            const input = {
              provider: `google`,
              mail: `grostest${i}@example.com`,
              username: `BITE${i}`,
              firstname: `Jean`,
              lastname: `D'eau`,
              picture: `https://URLDEOUF.COM`,
              locale: `fr`,
              authType: `oauth`,
            }

            jest
              .spyOn(usersService, `findOneByEmail`)
              .mockResolvedValueOnce(null)

            const result = await authService.googleLogin(input)
            expect(result.username).toEqual(input.username)
            expect(result.email).toEqual(input.mail)
            expect(result.password).toEqual(null)
            expect(result.githubId).toEqual(null)
            expect(result.googleId).toEqual(input.mail)
            expect(result.school42Id).toEqual(null)
            expect(result.discordId).toEqual(null)
          }
        })
      })

      describe(`GoogleAuthLogin`, () => {
        it(`Les comptes google oauth créés précedemment essaient maintenant de se connecter`, async () => {
          for (let i = 10; i < 20; i++) {
            const input = {
              provider: `google`,
              mail: `grostest${i}@example.com`,
              username: `BITE${i}`,
              firstname: `Jean`,
              lastname: `D'eau`,
              picture: `https://URLDEOUF.COM`,
              locale: `fr`,
              authType: `oauth`,
            }

            const associatedUser = await usersService.findOneByEmail(input.mail)

            const result = await authService.googleLogin(input)

            expect(result.username).toEqual(input.username)
            expect(result.email).toEqual(input.mail)
            expect(result.password).toEqual(null)
            expect(result.githubId).toEqual(null)
            expect(result.googleId).toEqual(input.mail)
            expect(result.school42Id).toEqual(null)
            expect(result.discordId).toEqual(null)
            expect(result.id).toEqual(associatedUser.id)
          }
        })
      })

      describe(`GoogleAccountTryLocalLogin`, () => {
        it(`Les comptes google oauth créés précedemment essaient maintenant de se connecter via 
		LEUR MAIL ET PAS DE PASSWORD sur le login flow classiques, ils peuvent aller se faire foutre`, async () => {
          for (let i = 10; i < 20; i++) {
            const input = {
              emailOrUsername: `grostest${i}@example.com`,
              password: null,
            }

            const associatedUser = await usersService.findOneByEmail(
              input.emailOrUsername,
            )

            expect(async () => {
              await authService.signInLocal(input)
            }).rejects.toThrow(UnauthorizedException)

            expect(associatedUser.id).toHaveLength
          }
        })
      })

      describe(`GoogleAccountTryLocalLogin`, () => {
        it(`Les comptes google oauth créés précedemment essaient maintenant de se connecter via 
		LEUR MAIL ET UN PASSWORD RANDOM sur le login flow classiques, ils peuvent aller se faire foutre`, async () => {
          for (let i = 10; i < 20; i++) {
            const input = {
              emailOrUsername: `grostest${i}@example.com`,
              password: `Prout59xd%()`,
            }

            const associatedUser = await usersService.findOneByEmail(
              input.emailOrUsername,
            )

            expect(async () => {
              await authService.signInLocal(input)
            }).rejects.toThrow(UnauthorizedException)

            expect(associatedUser.id).toHaveLength
          }
        })
      })

      describe(`GoogleAccountTryLocalLogin`, () => {
        it(`Les comptes google oauth créés précedemment essaient maintenant de se connecter via 
		LEUR USERNAME ET PAS DE MOT DE PASSE sur le login flow classiques, ils peuvent aller se faire foutre`, async () => {
          for (let i = 10; i < 20; i++) {
            const input = {
              emailOrUsername: `BITE${i}`,
              password: null,
            }

            const associatedUser = await usersService.findOneByUsername(
              input.emailOrUsername,
            )

            expect(async () => {
              await authService.signInLocal(input)
            }).rejects.toThrow(UnauthorizedException)

            expect(associatedUser.id).toHaveLength
          }
        })
      })

      describe(`GoogleAccountTryLocalLogin`, () => {
        it(`Les comptes google oauth créés précedemment essaient maintenant de se connecter via 
		LEUR USERNAME ET UN MOT DE PASSE RANDOM sur le login flow classiques, ils peuvent aller se faire foutre`, async () => {
          for (let i = 10; i < 20; i++) {
            const input = {
              emailOrUsername: `BITE${i}`,
              password: `Prout59xd%()`,
            }

            const associatedUser = await usersService.findOneByUsername(
              input.emailOrUsername,
            )

            expect(async () => {
              await authService.signInLocal(input)
            }).rejects.toThrow(UnauthorizedException)

            expect(associatedUser.id).toHaveLength
          }
        })
      })

      describe(`GoogleAuthLogin`, () => {
        it(`Les comptes classiques créés précedemment essaient maintenant de se connecter via 
		GOOGLE OAUTH, MEME MAIL, MEME USERNAME ils peuvent aller se faire foutre`, async () => {
          for (let i = 0; i < 10; i++) {
            const input = {
              provider: `google`,
              mail: `grostest${i}@example.com`,
              username: `BITE${i}`,
              firstname: `Jean`,
              lastname: `D'eau`,
              picture: `https://URLDEOUF.COM`,
              locale: `fr`,
              authType: `oauth`,
            }

            const associatedUser = await usersService.findOneByEmail(input.mail)

            expect(async () => {
              await authService.googleLogin(input)
            }).rejects.toThrow(UnauthorizedException)
            expect(associatedUser.id).toHaveLength
          }
        })
      })

      describe(`GoogleAuthLogin`, () => {
        it(`Les comptes classiques créés précedemment essaient maintenant de se connecter via 
		GOOGLE OAUTH, MAIL DIFFERENT, MEME USERNAME`, async () => {
          for (let i = 0; i < 10; i++) {
            const input = {
              provider: `google`,
              mail: `unautregrostest${i}@example.com`,
              username: `BITE${i}`,
              firstname: `Jean`,
              lastname: `D'eau`,
              picture: `https://URLDEOUF.COM`,
              locale: `fr`,
              authType: `oauth`,
            }

            jest
              .spyOn(usersService, `findOneByEmail`)
              .mockResolvedValueOnce(null)

            const result = await authService.googleLogin(input)
            //here we check if the given username will be different on the db
            //we have no other users with the given mail, but another user with the same username
            expect(result.username).not.toBe(input.username)
            expect(result.email).toEqual(input.mail)
            expect(result.password).toEqual(null)
            expect(result.githubId).toEqual(null)
            expect(result.googleId).toEqual(input.mail)
            expect(result.school42Id).toEqual(null)
            expect(result.discordId).toEqual(null)
          }
        })

        describe(`GoogleAuthLogin`, () => {
          it(`Les comptes classiques créés précedemment essaient maintenant de se connecter via 
			GOOGLE OAUTH, MEME MAIL, USERNAME DIFFERENT ils peuvent aller se faire foutre`, async () => {
            for (let i = 0; i < 10; i++) {
              const input = {
                provider: `google`,
                mail: `grostest${i}@example.com`,
                username: `ANOTHERBITE${i}`,
                firstname: `Jean`,
                lastname: `D'eau`,
                picture: `https://URLDEOUF.COM`,
                locale: `fr`,
                authType: `oauth`,
              }

              const associatedUser = await usersService.findOneByEmail(
                input.mail,
              )

              //here the site should block the user attempt because another user have
              //the same email
              expect(async () => {
                await authService.googleLogin(input)
              }).rejects.toThrow(UnauthorizedException)

              expect(associatedUser.id).toHaveLength
            }
          })
        })

        describe(`flush DB`, () => {
          it(`flush userDB`, async () => {
            await usersService.deleteAll()
          })
        })
      })
    })
  })
})
