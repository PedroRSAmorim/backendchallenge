import { DataSource, Repository } from 'typeorm'
import { Injectable, BadRequestException } from '@nestjs/common'
import { Content } from 'src/content/entity'

@Injectable()
export class ContentRepository {
  private readonly contentRepository: Repository<Content>

  constructor(private readonly dataSource: DataSource) {
    this.contentRepository = this.dataSource.getRepository(Content)
  }

  async findOne(contentId: string): Promise<Content> {
    if (!contentId) {
      throw new BadRequestException('Content ID not found')
    }

    const content = await this.contentRepository.findOne({
      where: { id: contentId, deleted_at: null },
    })

    return content || null
  }
}
