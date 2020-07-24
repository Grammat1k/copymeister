import Rule from '@/VideoCreator/lib/Crawler/Reddit/SuitabilityRules/Rule';

export default class ExcludeCrossposts extends Rule {
  validate(post, opts) {
    return post.crosspost_parent_list;
  }
}
