<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    const { icon, title, isCollapse } = context.props
    const vnodes = []

    if (icon) {
      // vnodes.push(<svg-icon icon-class={icon}/>)
      vnodes.push(<i class={icon} style={ isCollapse ? 'display:inline-block' : 'display:none'  } ></i>);
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
