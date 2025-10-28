import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsBigTitle extends Struct.ComponentSchema {
  collectionName: 'components_sections_big_titles';
  info: {
    displayName: 'big-title';
    icon: 'bell';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface SectionsCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_cards';
  info: {
    displayName: 'card';
    icon: 'collapse';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SectionsCommon extends Struct.ComponentSchema {
  collectionName: 'components_sections_shareds';
  info: {
    displayName: 'shared';
    icon: 'play';
  };
  attributes: {
    label: Schema.Attribute.String;
    section: Schema.Attribute.Relation<
      'oneToOne',
      'api::shared-section.shared-section'
    >;
  };
}

export interface SectionsComponents extends Struct.ComponentSchema {
  collectionName: 'components_sections_components';
  info: {
    description: '';
    displayName: 'Components';
  };
  attributes: {
    components: Schema.Attribute.Relation<
      'oneToMany',
      'api::component.component'
    >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsInto extends Struct.ComponentSchema {
  collectionName: 'components_sections_intos';
  info: {
    displayName: 'into';
    icon: 'chartPie';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.big-title': SectionsBigTitle;
      'sections.card': SectionsCard;
      'sections.common': SectionsCommon;
      'sections.components': SectionsComponents;
      'sections.into': SectionsInto;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
