
#pragma once

#include "JsiDomRenderNode.h"

namespace RNSkia {

class JsiGroupNode : public JsiDomRenderNode,
                     public JsiDomNodeCtor<JsiGroupNode> {
public:
  JsiGroupNode(std::shared_ptr<RNSkPlatformContext> context)
      : JsiDomRenderNode(context, "skGroup") {}

  void renderNode(DrawingContext *context) override {
    for (auto &child : getChildren()) {
      auto renderNode = std::dynamic_pointer_cast<JsiDomRenderNode>(child);
      if (renderNode != nullptr) {
        renderNode->render(context);
      }
    }
  }
};

} // namespace RNSkia
