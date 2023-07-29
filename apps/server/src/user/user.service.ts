import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { GoogleAuthType, ResultWithData } from 'src/types'
import { success } from 'src/common/constant'

@Injectable()
export class UserService {
  constructor(
    // 使用泛型注入对应类型的存储库实例
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * 创建
   *
   * @param user User 实体对象
   */
  async createUser(user: User): Promise<User> {
    /**
     * 创建新的实体实例，并将此对象的所有实体属性复制到新实体中。 请注意，它仅复制实体模型中存在的属性。
     */
    // this.userRepo.create(user);

    // 插入数据时，删除 id，以避免请求体内传入 id
    delete user.id
    return this.userRepo.save(user)

    /**
     * 将给定实体插入数据库。与save方法不同，执行原始操作时不包括级联，关系和其他操作。
     * 执行快速有效的INSERT操作。不检查数据库中是否存在实体，因此如果插入重复实体，本次操作将失败。
     */
    // await this.userRepo.insert(user);
  }

  /**
   * 删除
   *
   * @param id ID
   */
  async deleteUser(id: number): Promise<void> {
    await this.findUserById(id)
    this.userRepo.delete(id)
  }

  /**
   * 更新
   *
   * @param id ID
   * @param user User 实体对象
   */
  async updateUser(id: number, user: User): Promise<void> {
    await this.findUserById(id)
    // 更新数据时，删除 id，以避免请求体内传入 id
    delete user.id
    this.userRepo.update(id, user)
  }

  /**
   * 根据ID查询
   *
   * @param id ID
   */
  async findUser(id: number): Promise<User[]> {
    return this.findUserById(id)
  }

  async findOneByName(userName: string): Promise<User[]> {
    return this.findUserByName(userName)
  }

  async findOneByEmail(email: string): Promise<User[]> {
    return this.findOneByEmailUtil(email)
  }

  async handlerGoogleAuth(
    userInfo: GoogleAuthType,
  ): Promise<ResultWithData<User>> {
    const { email } = userInfo
    const users = await this.findUserByEmail(email)
    if (users.length === 0) {
      const saveUserRes = await this.saveGoogleUser(userInfo)
      console.log('saveUserRes===>', saveUserRes)
      return {
        code: success,
        msg: 'Sign in successfully with google,saved',
        data: saveUserRes,
      }
    }

    return {
      code: success,
      msg: 'Sign in successfully with google,saved before',
      data: null,
    }
  }

  /**
   * 根据ID查询单个信息，如果不存在则抛出404异常
   * @param id ID
   */
  private async findUserById(id: number): Promise<User[]> {
    const users = (await this.userRepo.find({
      where: {
        id,
      },
    })) as User[]

    if (!users.length) {
      throw new HttpException(`指定 id=${id} 的用户不存在`, 404)
    }
    return users
  }

  private async findUserByName(username: string): Promise<User[]> {
    const users = await this.userRepo.find({
      where: {
        username,
      },
    })

    if (!users.length) {
      throw new HttpException(`指定 username=${username} 的用户不存在`, 404)
    }
    return users
  }

  private async findOneByEmailUtil(email: string): Promise<User[]> {
    const users = await this.userRepo.find({
      where: {
        email,
      },
    })

    if (!users.length) {
      throw new HttpException(`指定 email=${email} 的用户不存在`, 404)
    }
    return users
  }

  private async findUserByEmail(email: string): Promise<User[]> {
    return await this.userRepo.find({
      where: {
        email,
      },
    })
  }

  private async saveGoogleUser(userInfo: GoogleAuthType): Promise<User> {
    const { email, picture, name, id, given_name } = userInfo

    const user = new User()
    user.email = email
    user.login = 'google'
    user.avatar = picture
    user.username = given_name || name
    user.nickname = name || given_name
    // user.bio = null
    user.phone = null
    user.jobTitle = null
    user.password = null
    user.planType = null
    user.githubId = null
    user.googleId = id

    return await this.userRepo.save(user)
  }
}
